/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Review = require('../models/review');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create review */
exports.createReview = async (req, res) => {
	try {
		const review = await new Review({
			organizer: req.body.organizer,
			user: req.body.user,
			rating: req.body.rating,
			comment: req.body.comment
		}).save();

		return res.json({
			message: 'Review created successfully',
			review,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create review', { create_review_failed: true }, err);
	}
};

/* GET reviews of organizer */
exports.fetchReviewsOfOrganizer = async (req, res) => {
	try {
		const reviews = await Review.find({ organizer: req.params.organizerId });

		return res.json({
			message: 'Reviews fetched successfully',
			reviews,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch reviews', { fetch_reviews_failed: true }, err);
	}
};
