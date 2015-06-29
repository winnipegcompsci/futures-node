'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ticker Schema
 */
var TickerSchema = new Schema({
	date: {
        type: Date,
        default: Date.now,
    },
    exchange: {
        // type: Schema.ObjectId,
        // ref: 'Exchange',
        
        type: String,
        default: '',
        required: 'Which Exchange Provided this Ticker?',
        trim: true,
    },
    buy: {
        type: String,
        default: '',
        required: 'Please fill in Buy Price',
        trim: true,
    },
    high: {
        type: String,
        default: '',
        required: 'Please Fill in High Price',
        trim: true,
    },
    last: {
        type: String,
        default: '',
        required: 'Please Fill in Last Price',
        trim: true,
    },
    low: {
        type: String,
        default: '',
        required: 'Please Fill In Low Price',
        trim: true,
    },
    sell: {
        type: String,
        default: '',
        required: 'Please Fill In Sell Price',
        trim: true,
    },
    volume: {
        type: String,
        default: '',
        required: 'Please Fill In Volume',
        trim: true,
    },
});

mongoose.model('Ticker', TickerSchema);