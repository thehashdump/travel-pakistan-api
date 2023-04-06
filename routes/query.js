/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { createQuery, fetchAllQueries } = require('../controllers/query');

router.post('/create-query', createQuery);
router.get('/all-queries', fetchAllQueries);

module.exports = router;
