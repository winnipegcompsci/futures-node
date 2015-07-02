'use strict';

//Setting up route
angular.module('advices').config(['$stateProvider',
	function($stateProvider) {
		// Advices state routing
		$stateProvider.
		state('listAdvices', {
			url: '/advices',
			templateUrl: 'modules/advices/views/list-advices.client.view.html'
		}).
		state('createAdvice', {
			url: '/advices/create',
			templateUrl: 'modules/advices/views/create-advice.client.view.html'
		}).
		state('viewAdvice', {
			url: '/advices/:adviceId',
			templateUrl: 'modules/advices/views/view-advice.client.view.html'
		}).
		state('editAdvice', {
			url: '/advices/:adviceId/edit',
			templateUrl: 'modules/advices/views/edit-advice.client.view.html'
		});
	}
]);