/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { createReview, fetchReviewsOfOrganizer } = require('../controllers/review');

router.post('/create-review', createReview);
router.get('/reviews/:organizerId', fetchReviewsOfOrganizer);

module.exports = router;
