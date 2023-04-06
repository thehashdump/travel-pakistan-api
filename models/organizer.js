/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const organizerSchema = mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String, trim: true, required: true
		},
		email: {
			type: String, trim: true, required: true, unique: true, lowercase: true
		},
		password: {
			type: String, required: true,
		},
		tagline: {
			type: String, trim: true, required: true
		},
		description: {
			type: String, trim: true, required: true
		},
		phone: {
			type: String, trim: true, required: true
		},
		address: {
			type: String, trim: true, required: true
		},
		images: {
			type: Array, required: true, default: []
		},
		coverImage: {
			type: String, required: true
		},
		displayPicture: {
			type: String, required: true
		},
		certificates: {
			type: Array, required: true, default: []
		},
		specialities: {
			type: Array, required: true, default: []
		},
		verified: {
			type: Boolean, required: true, default: false
		},
		tripsCompleted: {
			type: Number, required: true, default: 0
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Organizer', organizerSchema);
