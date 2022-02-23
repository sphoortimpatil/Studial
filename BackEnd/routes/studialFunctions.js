const express = require("express");
const router = express.Router();
const Upload = require("../models/Documents");
const FilesData = require("../models/FilesData");
const User = require("../models/User");
const check_auth = require("../middlewares/auth");

router.get("/test", check_auth, async (req, res) => {
	console.log(req.headers, "here");
	res.send("auth cleared");
});

router.post("/upload", check_auth, async (req, res) => {
	console.log(req.body.type);
	try {
		const newUpload = await new Upload({
			userId: req.user.userId,
			department: req.body.department.value,
			semester: req.body.sem.value,
			type: req.body.type.value,
			subject: req.body.subject,
			title: req.body.title,
			// uploadData: req.body.upload,
			fileName: req.body.fileName,
		});
		await newUpload.save();

		try {
			const newFiledata = await new FilesData({
				uploadId: newUpload._id,
				uploadData: req.body.upload,
			});

			await newFiledata.save();
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: error,
				message: "Error Occcourred In Uploading File",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error,
			message: "Error Occcourred",
		});
	}
});

router.get("/home", check_auth, async (req, res) => {
	const { userId, semester, department } = req.user;
	console.log(req.user);
	console.log(semester, department);
	try {
		const allDocuments = await Upload.find({
			semester: semester,
			department: department,
		});
		console.log("docs", allDocuments);
		res.status(200).json({ data: allDocuments, message: "Found Documents" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error,
			message: "Error Occcourred",
		});
	}
});

//get a document
router.post("/getFile", check_auth, async (req, res) => {
	console.log(req.body.id, "id");
	try {
		const allDocuments = await FilesData.find({ uploadId: req.body.id });
		res.status(200).json({ data: allDocuments, message: "Found Documents" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error,
			message: "Error Occcourred",
		});
	}
});

//upvote
router.put("/upvote", check_auth, async (req, res) => {
	console.log(req.body.id);
	try {
		const userId = req.user.userId;
		var document;
		await Upload.findById(req.body.id)
			.then((r) => {
				document = r;
				console.log(r, "document");
			})
			.catch((e) => console.log(e));
		if (document.likes.includes(userId)) {
			await document.updateOne({ $pull: { likes: userId } });
			res.status(200).json("Post Disliked");
		} else if (document.dislikes.includes(userId)) {
			await document.updateOne({ $pull: { dislikes: userId } });
			await document.updateOne({ $push: { likes: userId } });
			res.status(200).json("Post Upvoted");
		} else if (!document.likes.includes(userId)) {
			await document.updateOne({ $push: { likes: userId } });
			res.status(200).json("Post Upvoted");
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// down vote
router.put("/downvote", check_auth, async (req, res) => {
	try {
		const userId = req.user.userId;
		const document = await Upload.findById(req.body.id);
		if (document.likes.includes(userId)) {
			await document.updateOne({ $pull: { likes: userId } });
			res.status(200).json("Post Changed to null from Liked");
		} else if (!document.dislikes.includes(userId)) {
			await document.updateOne({ $push: { dislikes: userId } });
			res.status(200).json("Post Disiked");
		} else {
			await document.updateOne({ $pull: { dislikes: userId } });
			res.status(200).json("Post made not disliked");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
