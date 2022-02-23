const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		maxlength: 255,
		required: true,
	},
	department: {
		type: String,
		maxlength: 25,
		required: true,
	},
	semester: {
		type: String,
		maxlength: 5,
		required: true,
	},

	email: {
		type: String,
		maxlength: 255,
		required: true,
		unique: true,
		match:
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	},
	password: {
		type: String,
		minlength: 8,
		required: true,
	},
	image: {
		type: String,
	},
	bookmarks: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("Users", UserSchema);
