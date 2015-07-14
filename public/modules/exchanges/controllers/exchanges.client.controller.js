'use strict';

// Exchanges controller
angular.module('exchanges').controller('ExchangesController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Exchanges',
	function($scope, $stateParams, $location, $http, Authentication, Exchanges) {
		$scope.authentication = Authentication;
        
        $scope.ExchangeClient = null;
        
		// Create new Exchange
		$scope.create = function() {
			// Create new Exchange object
			var exchange = new Exchanges ({
				name: this.name,
                apikey: this.apikey,
                secretkey: this.secretkey,
			});

			// Redirect after save
			exchange.$save(function(response) {
				$location.path('exchanges/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.apikey = '';
                $scope.secretkey = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Exchange
		$scope.remove = function(exchange) {
			if ( exchange ) { 
				exchange.$remove();

				for (var i in $scope.exchanges) {
					if ($scope.exchanges [i] === exchange) {
						$scope.exchanges.splice(i, 1);
					}
				}
			} else {
				$scope.exchange.$remove(function() {
					$location.path('exchanges');
				});
			}
		};

		// Update existing Exchange
		$scope.update = function() {
			var exchange = $scope.exchange;

			exchange.$update(function() {
				$location.path('exchanges/' + exchange._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        
		// Find a list of Exchanges
		$scope.find = function() {
			$scope.exchanges = Exchanges.query();
		};

		// Find existing Exchange
		$scope.findOne = function() {
			$scope.exchange = Exchanges.get({ 
				exchangeId: $stateParams.exchangeId
			});
            
            $scope.getAPIClient($scope.exchange);
		};

        $scope.findChartData = function() {
            $scope.exchange = Exchanges.get({
                exchangeId: $stateParams.exchangeId
            });
        };
        
        $scope.getAPIClient = function(exchange) {
        
            if(typeof(exchange.name) !== "undefined") {
                console.log("Looking up API Client for: " + exchange.name);
            
                if(exchange.name.toLowerCase() == "okcoin") {
                    return new OKCoin(exchange.apikey, exchange.secretkey);
                }
            } else {
                return false;
            }
        }
	}
]);