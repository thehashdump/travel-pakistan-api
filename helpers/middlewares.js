/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { badRequestHandler } = require('./errorHandlers');

exports.verifyUser = async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username });
	if (!user) {
		badRequestHandler(res, 'Error: User not found', { user_not_found: true });
	}
	const isMatch = await bcrypt.compare(req.body.password, user.password);

	if (!isMatch) {
		badRequestHandler(res, 'Error: Incorrect password', { incorrect_password: true });
	}
	req.body = { userId: user._id };
	next();
};

// verify duplicate username
exports.verifyDuplicateUsername = async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username });
	if (user) {
		return badRequestHandler(res, 'Error: Username already exists', { duplicate_username: true });
	}
	next();
};
