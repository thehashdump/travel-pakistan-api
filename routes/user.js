/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const { createUser, fetchUser } = require('../controllers/user');

router.post('/create-user', createUser);
router.get('/get-user/:id', fetchUser);

module.exports = router;
