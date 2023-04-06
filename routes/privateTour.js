/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { createPrivateTour } = require('../controllers/privateTour');

router.post('/create-private-tour', createPrivateTour);

module.exports = router;
