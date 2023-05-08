/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Organizer = require('../models/organizer');
const { serverErrorHandler } = require('../helpers/errorHandlers');
const Review = require('../models/review');
const Tour = require('../models/tour');

/* POST create organizer */
exports.createOrganizer = async (req, res) => {
	try {
		const organizer = await new Organizer({
			owner: req.body.owner,
			name: req.body.name,
			email: req.body.email,
			tagline: req.body.tagline,
			description: req.body.description,
			phone: req.body.phone,
			address: req.body.address,
			images: req.body.images,
			coverImage: req.body.coverImage,
			displayPicture: req.body.displayPicture,
			specialities: req.body.specialities,
			verified: true,
		}).save();

		return res.json({
			message: 'Organizer created successfully',
			organizer,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create organizer', { create_organizer_failed: true }, err);
	}
};

/* GET top organizers */
exports.getTopOrganizers = async (req, res) => {
	try {
		const organizers = await Review.aggregate([
			{
				$group: {
					_id: '$organizer',
					avgRating: { $avg: '$rating' }
				}
			},
			{
				$lookup: {
					from: 'organizers',
					localField: '_id',
					foreignField: '_id',
					as: 'organizer'
				}
			},
			{
				$unwind: '$organizer'
			},
			{
				$sort: { avgRating: -1 }
			},
			{
				$limit: 3
			},
			{
				$project: {
					'organizer._id': 1,
					'organizer.name': 1,
					'organizer.tripsCompleted': 1,
					avgRating: { $round: ['$avgRating', 1] },
					'organizer.displayPicture': 1
				}
			}
		]);

		return res.json({
			message: 'Organizers found successfully',
			organizers,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to find organizers', { organizers_not_found: true }, err);
	}
};

/* GET organizer */
exports.getOrganizer = async (req, res) => {
	try {
		const organizer = await Organizer.findById(req.params.organizerId);

		return res.json({
			message: 'Organizer found successfully',
			organizer,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to find organizer', { organizer_not_found: true }, err);
	}
};

/* GET organizer dashboard data */
exports.getOrganizerDashboardData = async (req, res) => {
	try {
		let dashboardData = {
			totalTours: 0,
			ticketsSold: 0,
			ratings: 0,
			tours: [
				{
					name: '',
					ticketsSold: 0,
				}
			],
		};
		const organizer = await Organizer.findById(req.params.organizerId);
		let tours = await Tour.find({ organizer: organizer.owner });
		tours = tours.slice(Math.max(tours.length - 5, 0));
		const reviews = await Review.find({ organizer: organizer._id });
		const ticketsSold = tours.reduce((acc, tour) => acc + tour.ticketsPurchased, 0);
		const ratings = reviews.reduce((acc, review) => acc + review.rating, 0);
		const avgRating = ratings / reviews.length;
		dashboardData = {
			totalTours: tours.length,
			ticketsSold,
			ratings: Math.round(avgRating),
			tours: tours.map((tour) => ({
				name: tour.name,
				ticketsSold: tour.ticketsPurchased,
			})),
		};
		return res.json({
			message: 'Organizer found successfully',
			dashboardData,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to find organizer', { organizer_not_found: true }, err);
	}
};
