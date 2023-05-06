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
		travellers: {
			type: Object, default: { adults: 1, children: 0 }
		},
		amount: {
			type: Number, required: true
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
