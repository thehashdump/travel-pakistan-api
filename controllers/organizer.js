/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const Organizer = require('../models/organizer');
const { serverErrorHandler } = require('../helpers/errorHandlers');
const Review = require('../models/review');

/* POST create organizer */
exports.createOrganizer = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const organizer = await new Organizer({
			owner: req.body.owner,
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			tagline: req.body.tagline,
			description: req.body.description,
			phone: req.body.phone,
			address: req.body.address,
			images: req.body.images,
			coverImage: req.body.coverImage,
			displayPicture: req.body.displayPicture,
			certificates: req.body.certificates,
			specialities: req.body.specialities,
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
					avgRating: 1
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
