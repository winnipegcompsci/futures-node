'use strict';

// Strategies controller
angular.module('strategies').controller('StrategiesController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Strategies',
	function($scope, $stateParams, $location, $http, Authentication, Strategies) {
        $scope.authentication = Authentication;
                
        $http.get("/exchanges").
            success(function(data) {
                $scope.exchanges = data;
            });
        
        // Create new Strategy
		$scope.create = function() {
			// Create new Strategy object
			var strategy = new Strategies ({
				name: this.name
			});

			// Redirect after save
			strategy.$save(function(response) {
				$location.path('strategies/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Strategy
		$scope.remove = function(strategy) {
			if ( strategy ) { 
				strategy.$remove();

				for (var i in $scope.strategies) {
					if ($scope.strategies [i] === strategy) {
						$scope.strategies.splice(i, 1);
					}
				}
			} else {
				$scope.strategy.$remove(function() {
					$location.path('strategies');
				});
			}
		};

		// Update existing Strategy
		$scope.update = function() {            
			var strategy = $scope.strategy;

			strategy.$update(function() {
				$location.path('strategies/' + strategy._id);
			}, function(errorResponse) {
                console.log("Error:: " + errorResponse.data.message);
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Strategies
		$scope.find = function() {
			$scope.strategies = Strategies.query();
		};

		// Find existing Strategy
		$scope.findOne = function() {
			$scope.strategy = Strategies.get({ 
				strategyId: $stateParams.strategyId
			});
            
            buildProfitChart();
		};
        
        $scope.getPrimaryExchangeName = function() {
            var strategy = $scope.strategy
            var exchangeID =  strategy.primaryExchange;
            var thisExchangeName = "N/A";
            
            if(typeof $scope.exchanges !== 'undefined') {
                $scope.exchanges.forEach(function (exchange) {
                    if(exchange._id == exchangeID) {
                        thisExchangeName = exchange.name;                    
                    }
                });
            }
            
            return thisExchangeName;
        };
        
        $scope.getInsuranceExchangeName = function() {
            var strategy = $scope.strategy;
            var exchangeID =  strategy.insuranceExchange;
            var thisExchangeName = "N/A";
            
            if(typeof $scope.exchanges !== 'undefined') {
                $scope.exchanges.forEach(function (exchange) {
                    if(exchange._id == exchangeID) {
                        thisExchangeName = exchange.name;                    
                    }
                });
            }
            
            return thisExchangeName;
            
        };
	}
]);