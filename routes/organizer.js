/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	createOrganizer,
	getTopOrganizers,
	getOrganizer,
	getOrganizerDashboardData,
	getPurchasedTickets,
	fetchOrganizersGraphData,
	fetchWidgetsData,
	fetchAllOrganizers,
} = require('../controllers/organizer');

router.post('/create-organizer', createOrganizer);
router.get('/top-organizers', getTopOrganizers);
router.get('/organizers/:organizerId', getOrganizer);
router.get('/organizer-dashboard/:organizerId', getOrganizerDashboardData);
router.get('/organizer-purchased-tickets/:organizerId', getPurchasedTickets);
router.get('/organizers-graph', fetchOrganizersGraphData);
router.get('/widgets-data', fetchWidgetsData);
router.get('/organizers', fetchAllOrganizers);

module.exports = router;
