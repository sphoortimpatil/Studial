const express = require("express");
const User = require("../models/User");
const Upload = require("../models/Documents");
const jwt = require("jsonwebtoken");
const router = express.Router();

const bcrypt = require("bcrypt");
const check_auth = require("../middlewares/auth");

router.get("/", (req, res) => {
	res.send("Hi User");
});

router.post("/register", async (req, res) => {
	console.log("signip here");
	console.log(req.body);
	const user = await User.findOne({ email: req.body.email });
	if (user != null) {
		res.status(409).json({
			message: "User already exists",
		});
	} else {
		bcrypt.hash(req.body.password, 10, async (err, hash) => {
			if (err) {
				console.log(err, "hash error");
				return res.status(500).json(err);
			} else {
				const user = await new User({
					name: req.body.name,
					email: req.body.email,
					department: req.body.department.value,
					semester: req.body.sem.value,
					password: hash,
				});

				try {
					await user.save();
					const token = jwt.sign(
						{
							email: user.email,
							userId: user._id,
							name: user.name,
							semester: user.semester,
							department: user.department,
						},
						process.env.JWT_KEY
					);
					res.status(201).json({
						token: token,
						message: "User Created",
					});
				} catch (error) {
					res.status(500).json({ error: error });
				}
			}
		});
	}
});

router.post("/login", async (req, res) => {
	console.log(req.body);
	const user = await User.findOne({ email: req.body.email });
	console.log("user login", user);
	if (user == null) {
		return res.status(401).json({
			message: "Auth Failed1",
		});
	} else {
		bcrypt.compare(req.body.password, user.password, (e, result) => {
			if (e) {
				return res.status(401).json({
					message: "Auth Failed",
				});
			}
			if (result) {
				const token = jwt.sign(
					{
						email: user.email,
						userId: user._id,
						name: user.name,
						semester: user.semester,
						department: user.department,
					},
					process.env.JWT_KEY
				);
				console.log("token at login", token);
				res.status(200).json({
					token: token,
				});
			} else {
				return res.status(401).json({ message: "Auth Failed" });
			}
		});
	}
});

//get uploads

router.get("/all-uploads", check_auth, async (req, res) => {
	console.log("in uoloads");
	try {
		const userDocuments = await Upload.find({ userId: req.user.userId });

		res.status(200).json({
			data: userDocuments,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
});

//get user bookmarks
router.get("/bookmarks", check_auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		const allBookmarks = await user.bookmarks;
		// const bookmarkedDocuments = [];
		// await allBookmarks.forEach((e) => {
		// 	var val = Upload.findById(e);
		// 	console.log(val);
		// });
		const records = await Upload.find({ _id: { $in: allBookmarks } });

		console.log(records, "here");
		res.status(200).json({
			data: records,
			allBookmarks: allBookmarks,
			message: "Boook Marks Fetched Successfully!",
		});
	} catch (error) {
		res.status(500).json({
			eerer: error,
		});
	}
});

//add bookmark
router.put("/addBookmark", check_auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		const bookId = req.body.id;

		if (user.bookmarks.includes(bookId)) {
			console.log("dfsadfsadf");
			await user.updateOne({ $pull: { bookmarks: bookId } });
			res.status(200).json("Bookmark removed");
		} else {
			console.log("dfsadfsadf");
			await user.updateOne({ $push: { bookmarks: bookId } });
			res.status(200).json("Bookmark added");
		}
	} catch (error) {
		res.status(500).json("An error occurred", error);
	}
});

module.exports = router;
