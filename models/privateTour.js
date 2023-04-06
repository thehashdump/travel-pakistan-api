/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const privateTourSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		destination: {
			type: String,
			required: true
		},
		route: {
			type: Array,
			required: true,
			default: []
		},
		durationDays: {
			type: Number,
			required: true
		},
		travelers: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		departureDate: {
			type: Date,
			required: true
		},
		departureTime: {
			type: String,
			required: true
		},
		departureLocation: {
			type: String,
			required: true
		},
		budget: {
			type: Number,
			required: true
		},
		bid: {
			type: [{
				organizer: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Organizer',
					default: null
				},
				price: Number
			}],
			required: true,
			default: []
		},
		status: {
			type: String,
			required: true,
			default: 'pending'
		},
		organizer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Organizer',
			default: null,
		},
		price: {
			type: Number,
			required: true,
			default: 0
		}

	},
	{ timestamps: true }
);

module.exports = mongoose.model('PrivateTour', privateTourSchema);
