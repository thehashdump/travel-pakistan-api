/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const tourPurchaseSchema = mongoose.Schema(
	{
		tour: {
			type: mongoose.Types.ObjectId,
			ref: 'Tour',
			required: true
		},
		purchasedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		travelers: {
			type: Object, default: { adults: 1, children: 0, infants: 0 }
		},
		pickup: {
			type: String, required: true
		},
		user: {
			type: Object
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('PurchasedTour', tourPurchaseSchema);
