/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
	{
		organizer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Organizer',
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		messages: {
			type: Array, required: true, default: []
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
