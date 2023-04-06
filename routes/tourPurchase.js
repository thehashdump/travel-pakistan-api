/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { purchaseTour, fetchToursOfUser } = require('../controllers/tourPurchase');

router.post('/purchase-tour', purchaseTour);
router.get('/purchased-tours/:userId', fetchToursOfUser);

module.exports = router;
