/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Organizer = require('../models/organizer');
const { serverErrorHandler } = require('../helpers/errorHandlers');
const Review = require('../models/review');
const Tour = require('../models/tour');
const User = require('../models/user');
const PurchasedTour = require('../models/tourPurchase');

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
			ratings: avgRating.toFixed(1),
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

// GET organizer purchased tickets
exports.getPurchasedTickets = async (req, res) => {
	try {
		const organizer = await Organizer.findById(req.params.organizerId);
		const tours = await Tour.find({ organizer: organizer.owner });
		let purchasedTickets = await PurchasedTour.find().sort({ createdAt: -1 })
			.populate('tour')
			.populate('purchasedBy');
		purchasedTickets = purchasedTickets.filter(
			(ticket) => tours.some((tour) => tour._id.toString() === ticket.tour._id.toString())
		);
		return res.json({
			message: 'Organizer found successfully',
			purchasedTickets,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to find organizer', { organizer_not_found: true }, err);
	}
};

exports.fetchOrganizersGraphData = async (req, res) => {
	try {
		const organizers = await Organizer.find({}).select('createdAt');
		const currentDate = new Date();
		const organizerGraphData = [];

		for (let i = 4; i >= 0; i -= 1) {
			const month = currentDate.getMonth() - i;
			const year = currentDate.getFullYear();
			const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

			let organizersCount = 0;
			organizers.forEach((organizer) => {
				const organizerMonth = new Date(organizer.createdAt).getMonth();
				const organizerYear = new Date(organizer.createdAt).getFullYear();
				if (organizerMonth === month && organizerYear === year) {
					organizersCount += 1;
				}
			});

			organizerGraphData.push({ name: monthName, organizers: organizersCount });
		}

		return res.json({
			message: 'Organizer graph data fetched successfully',
			organizerGraphData,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch organizer graph data', { fetch_organizer_graph_data_failed: true }, err);
	}
};

// fetch widget data
exports.fetchWidgetsData = async (req, res) => {
	try {
		const organizers = await Organizer.find({});
		const users = await User.find({});
		const tours = await Tour.find({});

		return res.json({
			message: 'Widgets data fetched successfully',
			widgetsData: {
				organizers: organizers.length,
				tours: tours.length,
				users: users.length,
			},
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch widgets data', { fetch_widgets_data_failed: true }, err);
	}
};

// fetch all organizers
exports.fetchAllOrganizers = async (req, res) => {
	try {
		const organizers = await Organizer.find({}).populate('owner');

		return res.json({
			message: 'Organizers fetched successfully',
			organizers,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch organizers', { fetch_organizers_failed: true }, err);
	}
}