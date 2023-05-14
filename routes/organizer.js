/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	createOrganizer,
	getTopOrganizers,
	getOrganizer,
	getOrganizerDashboardData,
	getPurchasedTickets,
} = require('../controllers/organizer');

router.post('/create-organizer', createOrganizer);
router.get('/top-organizers', getTopOrganizers);
router.get('/organizers/:organizerId', getOrganizer);
router.get('/organizer-dashboard/:organizerId', getOrganizerDashboardData);
router.get('/organizer-purchased-tickets/:organizerId', getPurchasedTickets);

module.exports = router;
