const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const FileInfoSchema = new Schema({
// 	userId: {
// 		type: String,
// 		// maxlength: 255,
// 		required: true,
// 	},
// 	likes: {
// 		type: Array,
// 		default: [],
// 	},
// 	dislikes: {
// 		type: Array,
// 		default: [],
// 	},

// 	department: {
// 		type: String,

// 		required: true,
// 	},
// 	semester: {
// 		type: String,

// 		required: true,
// 	},

// 	type: {
// 		type: String,

// 		required: true,
// 	},

// 	subject: {
// 		type: String,
// 		// maxlength: 25,
// 		required: true,
// 	},
// 	title: {
// 		type: String,
// 		// maxlength: 5,
// 		required: true,
// 	},
// 	fileName: {
// 		type: String,
// 		required: true,
// 	},
// });

// const FileDataSchema = new Schema({
// 	uploadId: {
// 		type: String,
// 		required: true,
// 	},
// 	uploaddata: {
// 		type: String,
// 		required: true,
// 	},
// });

const DocumentSchema = new Schema({
	userId: {
		type: String,
		// maxlength: 255,
		required: true,
	},
	likes: {
		type: Array,
		default: [],
	},
	dislikes: {
		type: Array,
		default: [],
	},

	department: {
		type: String,

		required: true,
	},
	semester: {
		type: String,

		required: true,
	},

	type: {
		type: String,

		required: true,
	},

	subject: {
		type: String,
		// maxlength: 25,
		required: true,
	},
	title: {
		type: String,
		// maxlength: 5,
		required: true,
	},
	// uploadData: {
	// 	type: String,
	// 	required: true,
	// },
	fileName: {
		type: String,
		required: true,
	},
	// fileInfo: FileInfoSchema,
	// fileData: FileDataSchema,
});
// const FileInfo = mongoose.model("FileInfo", FileInfoSchema);
// const FileData = mongoose.model("FileData", FileDataSchema);
module.exports = mongoose.model("Documents", DocumentSchema);

// module.exports = mongoose.model{
// 	FileInfo,FileData
// }
