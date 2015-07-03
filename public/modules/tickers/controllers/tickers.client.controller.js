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

        $scope.setLogoURL = function(exchangeName) {
            $scope.logourl = "http://placehold.it/150x100";
            if(exchangeName.toLowerCase() == 'okcoin') {
                $scope.logourl = "https://img.okcoin.com/v_20150619001/image/new_v1/logo1.png";
            } else if (exchangeName.toLowerCase() == '796') {
                $scope.logourl = "https://796.com/images/theme/en/images/logo.jpg";
            } else if (exchangeName.toLowerCase() == 'bitvc') {
                $scope.logourl = "https://static.bitvc.com/images/en/logo.png";
            }
            return $scope.logourl;
            
        };
        
        // Get Last Price by Exchange Name.
        $scope.getLastPrice = function(exchangeName) {
            Tickers.query({
                "timestamp" : { $gte : Math.floor(new Date().setUTCHours(0, 0, 0, 0) / 1000) },
                "exchange" : exchangeName.toLowerCase(),
            }, function(ticks) {
                var lastDate = 0;
                var thisLastPrice = 0;
                var currentIndex = 0;
                var sum = 0;

                ticks.forEach(function (tick) {                  
                    if(tick.exchange == exchangeName.toLowerCase()) {
                        if(Number(tick.last) > Number(sum / currentIndex)) {
                            $scope.directionClass = "fa fa-arrow-up fa-lg text-success";
                        } else if (Number(tick.last).toFixed(2) == Number(sum / currentIndex).toFixed(2)) {
                            $scope.directionClass = "fa fa-minus fa-lg text-warning";
                        } else {
                            $scope.directionClass = "fa fa-arrow-down fa-lg text-danger";
                        }
                    
                        $scope.lastPrice = '$' + Number(tick.last).toFixed(2);
                        $scope.lastVolume = Number(tick.volume).toFixed(2) + ' BTC';
                        
                        sum = sum + Number(tick.last);
                        currentIndex = currentIndex + 1;
                    
                        $scope.averagePrice = Number(sum / currentIndex).toFixed(2);
                        
                        // $scope.lastAverageDiff = "(Diff: " + (Number(tick.last) - Number(sum / currentIndex)).ToFixed(2) + ")";
                    }
                }); // end of iterating over ticks.
            });
               
            if(!$scope.lastPrice) {
                $scope.lastPrice = "$000.00";
                $scope.directionClass = "fa fa-spinner fa-pulse fa-lg text-info";
                $scope.lastUpdated = "";
            }            
        };
        
        $scope.getDayChartData = function() {            
            var data_okcoin = { data: [], timestamps: []};
            var data_seven = { data: [], timestamps: []};
            var data_bitvc = { data: [], timestamps: []};
            
            
            Tickers.query({
                "timestamp" : { $gte : new Date().setUTCHours(0, 0, 0, 0) }
            }, function(ticks) {
                ticks.forEach(function (tick) {
                    if(tick.exchange == "okcoin") {
                        data_okcoin.data.push(Number(tick.last).toFixed(2));
                        data_okcoin.timestamps.push(tick.timestamp.last);
                    }
                    
                    if(tick.exchange == "796") {
                        data_seven.data.push(Number(tick.last).toFixed(2));
                        data_seven.timestamps.push(tick.timestamp);
                    }
                    
                    if(tick.exchange == "bitvc") {
                        data_bitvc.data.push(Number(tick.last).toFixed(2));
                        data_seven.timestamps.push(tick.timestamp);
                    }               
                });
                
                $scope.chartData = {
                    okcoin: data_okcoin,
                    seven: data_seven,
                    bitvc: data_bitvc,
                };
                
                buildChart($scope.chartData);   // Call The Build Chart Function.
            });
            

            
        }
                        
		// Find existing Ticker
		$scope.findOne = function() {
			$scope.ticker = Tickers.get({ 
				tickerId: $stateParams.tickerId
			});
		};
	}
]);