'use strict';

angular.module('strategies').factory('getexchanges', ['$resource',
	function($resource) {
		// Getexchanges service logic
		// ...

        
        
		// Public API
		return {
			list: function() {
				return "Exchanges";
			}
		};
	}
]);