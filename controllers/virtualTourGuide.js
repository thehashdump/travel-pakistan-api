/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const VirtualTourGuide = require('../models/virtualTourGuide');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create destination */
exports.createDestination = async (req, res) => {
	try {
		const destination = await new VirtualTourGuide({
			destination: req.body.destination,
			touristCount: req.body.touristCount,
			location: req.body.location,
			images: req.body.images,
			hiddenPlaces: req.body.hiddenPlaces,
			tips: req.body.tips,
			tags: req.body.tags,
			overview: req.body.overview,
			viewPoints: req.body.viewPoints,
			culturalCusine: req.body.culturalCusine,
			culturalTraditions: req.body.culturalTraditions,
			activities: req.body.activities
		}).save();

		return res.json({
			message: 'Destination created successfully',
			destination,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create destination', { create_destination_failed: true }, err);
	}
};

/* GET all destinations */
exports.fetchAllDestinations = async (req, res) => {
	try {
		const destinations = await VirtualTourGuide.find();

		return res.json({
			message: 'Destinations fetched successfully',
			destinations,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch destinations', { fetch_destinations_failed: true }, err);
	}
};

/* GET destination by id */
exports.fetchDestinationById = async (req, res) => {
	try {
		const destination = await VirtualTourGuide.findById(req.params.id);

		return res.json({
			message: 'Destination fetched successfully',
			destination,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch destination', { fetch_destination_failed: true }, err);
	}
};
