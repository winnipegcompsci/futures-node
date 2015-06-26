'use strict';

angular.module('exchanges').factory('getticker', [
	function() {
		// Getticker service logic
		// ...

        console.log("GETTICKER SERVICE CALLED");
        
		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);
