/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	purchaseTour, fetchToursOfUser, cancelBooking, fetchALLPurchasedTours
} = require('../controllers/tourPurchase');

router.post('/purchase-tour', purchaseTour);
router.get('/purchased-tours/:userId', fetchToursOfUser);
router.get('/purchased-tours', fetchALLPurchasedTours);
router.post('/cancel-booking', cancelBooking);

module.exports = router;
