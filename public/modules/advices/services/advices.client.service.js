'use strict';

//Advices service used to communicate Advices REST endpoints
angular.module('advices').factory('Advices', ['$resource',
	function($resource) {
		return $resource('advices/:adviceId', { adviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);