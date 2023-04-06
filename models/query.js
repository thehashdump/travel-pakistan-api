/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const querySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		query: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Querie', querySchema);
