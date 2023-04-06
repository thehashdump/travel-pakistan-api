/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const discussionForumSchema = mongoose.Schema(
	{
		postOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		postTitle: {
			type: String, trim: true, required: true
		},
		postDescription: {
			type: String, trim: true, required: true
		},
		comments: {
			type: Array, required: true, default: []
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Discussion', discussionForumSchema);
