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

// fetch all private tours of a user
exports.fetchPrivateToursOfUser = async (req, res) => {
	try {
		const privateTours = await PrivateTour.find({ user: req.params.userId }).populate('bid.organizer');
		return res.json({
			message: 'Private tours fetched successfully',
			privateTours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch private tours', { fetch_private_tours_failed: true }, err);
	}
};

// fetch all private tours
exports.fetchAllPrivateTours = async (req, res) => {
	try {
		let privateTours = await PrivateTour.find({}).populate('user');
		privateTours = privateTours.filter((privateTour) => privateTour.status === 'pending');
		console.log(privateTours);
		return res.json({
			message: 'Private tours fetched successfully',
			privateTours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch private tours', { fetch_private_tours_failed: true }, err);
	}
};

// bid private tour
exports.bidPrivateTour = async (req, res) => {
	try {
		const privateTour = await PrivateTour.findById(req.body.tourId);
		privateTour.bid.push({
			organizer: req.body.organizer,
			price: req.body.price,
		});
		privateTour.save();
		return res.json({
			message: 'Private tour bid successfully',
			privateTour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to bid private tour', { bid_private_tour_failed: true }, err);
	}
};

// accept bid
exports.acceptBid = async (req, res) => {
	try {
		const privateTour = await PrivateTour.findById(req.body.tour);
		privateTour.status = 'accepted';
		privateTour.organizer = req.body.organizer;
		privateTour.price = req.body.price;
		privateTour.bid = [];
		privateTour.save();
		return res.json({
			message: 'Private tour booked successfully',
			privateTour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to book private tour', { book_private_tour_failed: true }, err);
	}
};
