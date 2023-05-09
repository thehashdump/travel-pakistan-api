/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	createTour,
	searchTour,
	getTopTours,
	getTour,
	fetchToursByOrganizer,
	suggestMeTour,
} = require('../controllers/tour');

router.post('/create-tour', createTour);
router.get('/search-tours', searchTour);
router.get('/search-tours/:id', getTour);
router.get('/top-tours', getTopTours);
router.get('/suggest-me-tour', suggestMeTour);
router.get('/tours/:organizerId', fetchToursByOrganizer);

module.exports = router;
