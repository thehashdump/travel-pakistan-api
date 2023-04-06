/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const PrivateTour = require('../models/privateTour');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create private tour */
exports.createPrivateTour = async (req, res) => {
	try {
		const privateTour = await new PrivateTour({
			user: req.body.user,
			destination: req.body.destination,
			route: req.body.route,
			durationDays: req.body.durationDays,
			travelers: req.body.travelers,
			description: req.body.description,
			departureDate: req.body.departureDate,
			departureTime: req.body.departureTime,
			departureLocation: req.body.departureLocation,
			budget: req.body.budget,
			bid: req.body.bid,
			status: req.body.status,
			organizer: req.body.organizer,
			price: req.body.price
		}).save();
		return res.json({
			message: 'Private tour created successfully',
			privateTour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create private tour', { create_private_tour_failed: true }, err);
	}
};
