'use strict';

angular.module('exchanges').factory('Getlastprice', [
	function() {
		// Getlastprice service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			},
            
            okcoin: function() {
                return "OKC";
            },
            
            sevenninesix: function() {
                return "796";
            },
		};
	}
]);