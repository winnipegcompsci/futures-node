'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var advices = require('../../app/controllers/advices.server.controller');

	// Advices Routes
	app.route('/advices')
		.get(advices.list)
		.post(users.requiresLogin, advices.create);

	app.route('/advices/:adviceId')
		.get(advices.read)
		.put(users.requiresLogin, advices.hasAuthorization, advices.update)
		.delete(users.requiresLogin, advices.hasAuthorization, advices.delete);

	// Finish by binding the Advice middleware
	app.param('adviceId', advices.adviceByID);
};
