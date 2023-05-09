/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Qurie = require('../models/query');
const { serverErrorHandler } = require('../helpers/errorHandlers');

/* POST create query */
exports.createQuery = async (req, res) => {
	try {
		const query = await new Qurie({
			name: req.body.name,
			email: req.body.email,
			query: req.body.query
		}).save();

		return res.json({
			message: 'Query created successfully',
			query,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to create query', { create_query_failed: true }, err);
	}
};

/* GET all queries */
exports.fetchAllQueries = async (req, res) => {
	try {
		const queries = await Qurie.find();

		return res.json({
			message: 'Queries fetched successfully',
			queries,
		});
	} catch (err) {
		return serverErrorHandler(res, 'Error: Unable to fetch queries', { fetch_queries_failed: true }, err);
	}
};
