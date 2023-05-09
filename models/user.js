/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		username: {
			type: String, trim: true, maxlength: 32, required: true, unique: true
		},
		email: {
			type: String, trim: true, required: true, unique: true, lowercase: true
		},
		password: {
			type: String, required: true
		},
		address: {
			type: String, trim: true
		},
		phone: {
			type: String
		},
		cnic: {
			type: String
		},
		image: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
