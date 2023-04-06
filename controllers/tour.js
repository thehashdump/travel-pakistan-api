/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Tour = require('../models/tour');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create tour */
exports.createTour = async (req, res) => {
	try {
		const tour = await new Tour({
			name: req.body.name,
			destination: req.body.destination,
			organizer: req.body.organizer,
			durationDays: req.body.durationDays,
			capacity: req.body.capacity,
			ticketsPurchased: req.body.ticketsPurchased,
			requirements: req.body.requirements,
			tags: req.body.tags,
			images: req.body.images,
			description: req.body.description,
			route: req.body.route,
			tips: req.body.tips,
			departureDate: req.body.departureDate,
			departureTime: req.body.departureTime,
			departureLocation: req.body.departureLocation,
			price: req.body.price,
			active: req.body.active,
			featured: req.body.featured,
			discount: req.body.discount,
			inclusions: req.body.inclusions,
			exclusions: req.body.exclusions,
			tinerary: req.body.tinerary,
			overview: req.body.overview,
		}).save();

		return res.json({
			message: 'Tour created successfully',
			tour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create tour', { create_tour_failed: true }, err);
	}
};

/* GET search tour */
exports.searchTour = async (req, res) => {
	const {
		destination,
		pickup,
		days,
		people
	} = req.query;
	try {
		const tours = await Tour.find({
			destination: { $regex: new RegExp(destination, 'i') },
			departureLocation: { $regex: new RegExp(pickup, 'i') },
			durationDays: { $gte: parseInt(days, 10) },
			capacity: { $gte: parseInt(people, 10) }
		});
		return res.json({
			message: 'Tours found successfully',
			tours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to search tour', { search_tour_failed: true }, err);
	}
};

/* GET top tours */
exports.getTopTours = async (req, res) => {
	try {
		const tours = await Tour.find().sort({ ticketsPurchased: -1 }).limit(3);
		return res.json({
			message: 'Tours found successfully',
			tours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to get top tours', { get_top_tours_failed: true }, err);
	}
};

/* GET specific tour */
exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		return res.json({
			message: 'Tour found successfully',
			tour,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to get tour', { get_tour_failed: true }, err);
	}
};

/* GET tours by organizer */
exports.fetchToursByOrganizer = async (req, res) => {
	try {
		const tours = await Tour.find({ organizer: req.params.organizerId });
		return res.json({
			message: 'Tours found successfully',
			tours,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to get tours', { get_tours_failed: true }, err);
	}
};
