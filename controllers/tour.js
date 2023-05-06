/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Tour = require('../models/tour');
const Organizer = require('../models/organizer');
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
			itinerary: req.body.itinerary,
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
		let tour = await Tour.findById(req.params.id);
		const agencyName = await Organizer.find({ owner: tour.organizer }, 'name');
		tour = { ...tour._doc, agencyName: agencyName[0].name };
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

/* GET suggest me tour */
exports.suggestMeTour = async (req, res) => {
	const {
		destination,
		days,
		budget
	} = req.query;

	const tours = await Tour.find({ active: true })
		.sort({ featured: -1 })
		.populate('organizer', 'firstName lastName')
		.lean();

	let filteredTours = tours.filter((tour) => {
		const destRegex = new RegExp(destination, 'i');
		if (destination && !destRegex.test(tour.destination)) {
			return false;
		}
		if (days && (tour.durationDays < days - 2 || tour.durationDays > days + 2)) {
			return false;
		}
		if (budget) {
			const tourPrice = tour.price.adults;
			if (budget < tourPrice * 0.8) {
				return false;
			}
		}
		return true;
	});

	if (filteredTours.length === 0) {
		filteredTours = tours.filter((tour) => {
			if (destination && tour.destination.toLowerCase() !== destination.toLowerCase()) {
				return false;
			}
			return true;
		});

		filteredTours.sort((a, b) => {
			const tourPriceA = a.price.adults;
			const tourPriceB = b.price.adults;
			return tourPriceA - tourPriceB;
		});
	} else {
		filteredTours.sort((a, b) => {
			let scoreA = 0;
			let scoreB = 0;

			if (destination) {
				scoreA += a.destination.toLowerCase() === destination.toLowerCase() ? 10 : 0;
				scoreB += b.destination.toLowerCase() === destination.toLowerCase() ? 10 : 0;
			}

			if (days) {
				scoreA += Math.abs(a.durationDays - days) < 2 ? 5 : 0;
				scoreB += Math.abs(b.durationDays - days) < 2 ? 5 : 0;
			}

			if (budget) {
				const tourPriceA = a.price.adults;
				const tourPriceB = b.price.adults;
				const priceDiffA = Math.abs(tourPriceA - budget);
				const priceDiffB = Math.abs(tourPriceB - budget);
				if (priceDiffA < priceDiffB) {
					scoreA += 8;
				} else if (priceDiffB < priceDiffA) {
					scoreB += 8;
				} else {
					scoreA += 4;
					scoreB += 4;
				}
			}

			return scoreB - scoreA;
		});
	}

	if (filteredTours.length === 0) {
		const destRegex = new RegExp(destination, 'i');
		filteredTours = tours.filter((tour) => destRegex.test(tour.destination));
		if (filteredTours.length === 0) {
			filteredTours = tours;
			filteredTours.sort((a, b) => a.price.adults - b.price.adults);
			filteredTours = filteredTours.slice(0, 1);
		} else {
			filteredTours.sort((a, b) => a.price.adults - b.price.adults);
			filteredTours = filteredTours.slice(0, 1);
		}
	}

	res.json({
		message: 'Tours found successfully',
		tours: filteredTours,
	});
};
