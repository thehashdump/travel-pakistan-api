/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const {
	createPrivateTour,
	fetchPrivateToursOfUser,
	fetchAllPrivateTours, bidPrivateTour, acceptBid, fetchAllPrivateToursForAdmin
} = require('../controllers/privateTour');

router.post('/create-private-tour', createPrivateTour);
router.get('/private-tours/:userId', fetchPrivateToursOfUser);
router.get('/private-tours', fetchAllPrivateTours);
router.get('/private-tours-admin', fetchAllPrivateToursForAdmin);
router.post('/bid-private-tour', bidPrivateTour);
router.post('/book-private-tour', acceptBid);

module.exports = router;
