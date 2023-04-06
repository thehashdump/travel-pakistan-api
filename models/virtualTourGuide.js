/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const virtualTourGuideSchema = mongoose.Schema(
	{
		destination: {
			type: String,
			required: true
		},
		touristCount: {
			type: Number,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		images: {
			type: Array,
			required: true,
			default: []
		},
		hiddenPlaces: {
			type: [{
				name: String,
				description: String
			}],
			required: true,
			default: []
		},
		tips: {
			type: Array,
			required: true,
			default: []
		},
		tags: {
			type: Array,
			required: true,
			default: []
		},
		overview: {
			type: String,
			required: true
		},
		viewPoints: {
			type: [{
				name: String,
				description: String,
			}],
			required: true,
			default: []
		},
		culturalCusine: {
			type: [{
				name: String,
				description: String,
			}],
			required: true,
			default: []
		},
		culturalTraditions: {
			type: [{
				name: String,
				description: String,
			}],
			required: true,
			default: []
		},
		activities: {
			type: [{
				name: String,
				description: String,
			}],
			required: true,
			default: []
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('VirtualTourGuide', virtualTourGuideSchema);
