'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var strategies = require('../../app/controllers/strategies.server.controller');
    var exchanges = require('../../app/controllers/exchanges.server.controller');
    
	// Strategies Routes
	app.route('/strategies')
		.get(strategies.list)
		.post(users.requiresLogin, strategies.create);

	app.route('/strategies/:strategyId')
		.get(strategies.read)
		.put(users.requiresLogin, strategies.hasAuthorization, strategies.update)
		.delete(users.requiresLogin, strategies.hasAuthorization, strategies.delete);

    app.route('/strategies/exchangelist')
        .get(exchanges.list)
        .post(users.requiresLogin, exchanges.create);
	// Finish by binding the Strategy middleware
	app.param('strategyId', strategies.strategyByID);
};
