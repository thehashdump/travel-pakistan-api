/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	createOrganizer,
	getTopOrganizers,
	getOrganizer,
} = require('../controllers/organizer');

router.post('/create-organizer', createOrganizer);
router.get('/top-organizers', getTopOrganizers);
router.get('/organizers/:organizerId', getOrganizer);

module.exports = router;
