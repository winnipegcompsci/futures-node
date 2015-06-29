'use strict';

// Exchanges controller
angular.module('exchanges').controller('ExchangesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exchanges',
	function($scope, $stateParams, $location, Authentication, Exchanges) {
		$scope.authentication = Authentication;
        
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
		};
        
        $scope.currentPrice = function(exchange) {
            
            
            MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
                alert('Connecting');
                
                if(err) {
                    alert('Error: ' + err);
                    return "Err";
                }
    
    
                alert('No Errors');
                var tickers = db.collection('tickers');
            
                if(exchange.name.toUpperCase() == "OKCOIN") {
                    alert('Finding OKC Price');
                    conditions.exchange = "okcoin";
                } // end if OKCOIN
            
                if(exchange.name.toUpperCase() == "796") {
                    alert('Finding 796 Price');
                    
                    conditions.exchange = "796";
                } // end of 796.
            
            
                lastPrice = db.tickers.findOne(conditions).sort({date:-1});   // Add Sort by Timestamp Desc?
                
                alert('Last Price: ' + lastPrice);
                
                console.log("LAST PRICE: " + require('util').inspect(lastPrice));
                return lastPrice.last;
                
            
            });

            return "FT";   // Default
        }   // end of currentPrice().
        
	}
]);