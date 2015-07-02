'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
	type: {
		type: String,
		default: '',
		required: 'Please fill in Notification type',
		trim: true
	},
    message: {
        type: String,
        default: '',
        required: 'Please fill in Notification message',
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

mongoose.model('Notification', NotificationSchema);