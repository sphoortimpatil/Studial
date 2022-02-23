const express = require("express");
const MongodbConnect = require("./db");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
// var bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: ["*"],
		credentials: true,
	})
);

MongodbConnect();

// mongoose.connect(
// 	process.env.MONGODB_URL,
// 	{ useNewUrlParser: true, useUnifiedTopology: true },
// 	(err) => {
// 		console.log(err);
// 	}
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
// 	console.log("Connected");
// });

app.get("/", (req, res) => {
	res.send("hello");
});

//user routes
const userRouter = require("./routes/users");
app.use("/user", userRouter);

//study i.e studial routes
const studialRouter = require("./routes/studialFunctions");
app.use("/studial", studialRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listining ${port}`));
