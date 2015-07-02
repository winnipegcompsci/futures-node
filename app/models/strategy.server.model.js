'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Strategy Schema
 */
var StrategySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Strategy name',
		trim: true
	},
    primaryExchange: {
        type: Schema.ObjectId,
        ref: 'Exchange',
    },
    insuranceExchange: {
        type: Schema.ObjectId,
        ref: 'Exchange',
    },
    maxHedge: {
        type: Number,
        default: 100,               // Max Coins to Hedge (BTC)
    },
    maxBuyPrice: {
        type: Number,
        default: 300                // Max Buy Price (USD)
    },
    targetCoverageRate: {
        type: Number,
        default: 70                 // AS a Percent
    },
    autoTradeAdvice: {
        type: Boolean,
        default: false,
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

mongoose.model('Strategy', StrategySchema);