/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const emergencySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		solution: {
			type: String,
			required: true
		},
		phoneNumbers: {
			type: Array,
			required: true,
			default: []
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Emergencei', emergencySchema);
