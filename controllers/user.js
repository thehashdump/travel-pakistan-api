/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create user */
exports.createUser = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			address: req.body.address,
			phone: req.body.phone,
			cnic: req.body.cnic,
			image: req.body.image
		}).save();

		return res.json({
			message: 'User created successfully',
			user,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create user', { create_user_failed: true }, err);
	}
};

/* GET user */
exports.fetchUser = async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		user.password = undefined;

		return res.json({
			message: 'User fetched successfully',
			user,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch user', { fetch_user_failed: true }, err);
	}
};
