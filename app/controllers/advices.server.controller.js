'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Advice = mongoose.model('Advice'),
	_ = require('lodash');

/**
 * Create a Advice
 */
exports.create = function(req, res) {
	var advice = new Advice(req.body);
	advice.user = req.user;

	advice.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advice);
		}
	});
};

/**
 * Show the current Advice
 */
exports.read = function(req, res) {
	res.jsonp(req.advice);
};

/**
 * Update a Advice
 */
exports.update = function(req, res) {
	var advice = req.advice ;

	advice = _.extend(advice , req.body);

	advice.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advice);
		}
	});
};

/**
 * Delete an Advice
 */
exports.delete = function(req, res) {
	var advice = req.advice ;

	advice.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advice);
		}
	});
};

/**
 * List of Advices
 */
exports.list = function(req, res) { 
	Advice.find().sort('-created').populate('user', 'displayName').exec(function(err, advices) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advices);
		}
	});
};

/**
 * Advice middleware
 */
exports.adviceByID = function(req, res, next, id) { 
	Advice.findById(id).populate('user', 'displayName').exec(function(err, advice) {
		if (err) return next(err);
		if (! advice) return next(new Error('Failed to load Advice ' + id));
		req.advice = advice ;
		next();
	});
};

/**
 * Advice authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.advice.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
