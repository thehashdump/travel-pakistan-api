/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
	{
		name: {
			type: String, required: true
		},
		destination: {
			type: String, required: true
		},
		organizer: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		},
		durationDays: {
			type: Number, required: true
		},
		capacity: {
			type: Number, required: true
		},
		ticketsPurchased: {
			type: Number, required: true, default: 0
		},
		requirements: {
			type: Array, required: true, default: []
		},
		tags: {
			type: Array, required: true, default: []
		},
		images: {
			type: Array, required: true, default: []
		},
		description: {
			type: String, required: true
		},
		route: {
			type: Array, required: true, default: []
		},
		tips: {
			type: Array, required: true, default: []
		},
		departureDate: {
			type: Date, required: true
		},
		departureTime: {
			type: String, required: true
		},
		departureLocation: {
			type: Array, required: true, default: []
		},
		price: {
			type: Object, default: { adults: 0, children: 0 }
		},
		active: {
			type: Boolean, required: true, default: true
		},
		featured: {
			type: Boolean, default: false
		},
		discount: {
			type: Number, default: 0
		},
		inclusions: {
			type: Array, required: true, default: []
		},
		exclusions: {
			type: Array, required: true, default: []
		},
		tinerary: {
			type: Object, required: true, default: {}
		},
		overview: {
			type: String, required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Tour', tourSchema);
