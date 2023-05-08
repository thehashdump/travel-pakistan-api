/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const PurchasedTour = require('../models/tourPurchase');
const Tour = require('../models/tour');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST purchase tour */
exports.purchaseTour = async (req, res) => {
	try {
		let purchasedTour;
		if (req.body.purchasedBy) {
			purchasedTour = await new PurchasedTour({
				tour: req.body.tour,
				purchasedBy: req.body.purchasedBy,
				travellers: req.body.travellers,
				pickup: req.body.pickup,
				amount: req.body.amount,
			}).save();
		} else {
			purchasedTour = await new PurchasedTour({
				tour: req.body.tour,
				travellers: req.body.travellers,
				pickup: req.body.pickup,
				user: req.body.user,
				amount: req.body.amount,
			}).save();
		}
		const tour = await Tour.findById(req.body.tour);
		tour.ticketsPurchased += (parseInt(req.body.travellers.adults, 10) +
			parseInt(req.body.travellers.children, 10));
		await tour.save();
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
		console.log(req.params.userId);
		const tours = await PurchasedTour.find({ purchasedBy: req.params.userId }).populate('tour');

		return res.json({
			message: 'Tours fetched successfully',
			tours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch tours', { fetch_tours_failed: true }, err);
	}
};
