/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const PurchasedTour = require('../models/tourPurchase');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST purchase tour */
exports.purchaseTour = async (req, res) => {
	try {
		let purchasedTour;
		if (req.body.purchasedBy) {
			purchasedTour = await new PurchasedTour({
				tour: req.body.tour,
				purchasedBy: req.body.purchasedBy,
				travelers: req.body.travelers,
				pickup: req.body.pickup,
			}).save();
		} else {
			purchasedTour = await new PurchasedTour({
				tour: req.body.tour,
				travelers: req.body.travelers,
				pickup: req.body.pickup,
				user: req.body.user
			}).save();
		}

		return res.json({
			message: 'Tour purchased successfully',
			purchasedTour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to purchase tour', { purchase_tour_failed: true }, err);
	}
};

/* GET tours of user */
exports.fetchToursOfUser = async (req, res) => {
	try {
		const tours = await PurchasedTour.find({ user: req.params.id });

		return res.json({
			message: 'Tours fetched successfully',
			tours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch tours', { fetch_tours_failed: true }, err);
	}
};
