const mongoose = require("mongoose");

require("dotenv").config();
// console.log(`ddddddddddd ${process.env.MONGODB_URL}`);

module.exports = () => {
	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Coonnected to database."))
		.catch((err) => console.log("Could not connect to database.", err));
	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("Connected");
	});
};
