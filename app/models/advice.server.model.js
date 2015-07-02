'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advice Schema
 */
var AdviceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Advice name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Advice', AdviceSchema);