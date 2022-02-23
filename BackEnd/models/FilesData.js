const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FilesDataSchema = new Schema({
	uploadId: {
		type: String,
		required: true,
	},
	uploadData: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("FilesData", FilesDataSchema);
