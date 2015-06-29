'use strict';

// Tickers controller
angular.module('tickers').controller('TickersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tickers',
	function($scope, $stateParams, $location, Authentication, Tickers) {
		$scope.authentication = Authentication;

		// Create new Ticker
		$scope.create = function() {
			// Create new Ticker object
			var ticker = new Tickers ({
				name: this.name
			});

			// Redirect after save
			ticker.$save(function(response) {
				$location.path('tickers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ticker
		$scope.remove = function(ticker) {
			if ( ticker ) { 
				ticker.$remove();

				for (var i in $scope.tickers) {
					if ($scope.tickers [i] === ticker) {
						$scope.tickers.splice(i, 1);
					}
				}
			} else {
				$scope.ticker.$remove(function() {
					$location.path('tickers');
				});
			}
		};

		// Update existing Ticker
		$scope.update = function() {
			var ticker = $scope.ticker;

			ticker.$update(function() {
				$location.path('tickers/' + ticker._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tickers
		$scope.find = function() {
			$scope.tickers = Tickers.query();
		};

        // Get Last Price by Exchange Name.
        $scope.getLastPrice = function(exchangeName) {          
            Tickers.query({}, function(ticks) {
                var lastDate = 0;
                var thisLastPrice = 0;
                var currentIndex = 0;
                var sum = 0;

                ticks.forEach(function (tick) {                  
                    if(tick.exchange == exchangeName.toLowerCase()) {
                        if(Number(tick.last) > Number(sum / currentIndex)) {
                            $scope.directionClass = "fa fa-arrow-up fa-lg text-success";
                        } else if (Number(tick.last) === Number(sum / currentIndex)) {
                            $scope.directionClass = "fa fa-minus fa-lg text-warning";
                        } else {
                            $scope.directionClass = "fa fa-arrow-down fa-lg text-danger";
                        }
                    
                        $scope.lastPrice = '$' + Number(tick.last).toFixed(2);
                        $scope.lastVolume = Number(tick.volume).toFixed(2) + ' BTC';
                        
                        sum = sum + Number(tick.last);
                        currentIndex = currentIndex + 1;
                    
                        $scope.averagePrice = Number(sum / currentIndex).toFixed(2);
                    }
                }); // end of iterating over ticks.
            });
               
            if(!$scope.lastPrice) {
                $scope.lastPrice = "Loading...";
                $scope.directionClass = "fa fa-spinner fa-lg text-info";
            }
            
        };
        
        
                
		// Find existing Ticker
		$scope.findOne = function() {
			$scope.ticker = Tickers.get({ 
				tickerId: $stateParams.tickerId
			});
		};
	}
]);