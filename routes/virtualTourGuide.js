/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { createDestination, fetchAllDestinations, fetchDestinationById } = require('../controllers/virtualTourGuide');

router.post('/create-destination', createDestination);
router.get('/all-destinations', fetchAllDestinations);
router.get('/all-destinations/:id', fetchDestinationById);

module.exports = router;
