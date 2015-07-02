'use strict';

// Advices controller
angular.module('advices').controller('AdvicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Advices',
	function($scope, $stateParams, $location, Authentication, Advices) {
		$scope.authentication = Authentication;

		// Create new Advice
		$scope.create = function() {
			// Create new Advice object
			var advice = new Advices ({
				name: this.name
			});

			// Redirect after save
			advice.$save(function(response) {
				$location.path('advices/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Advice
		$scope.remove = function(advice) {
			if ( advice ) { 
				advice.$remove();

				for (var i in $scope.advices) {
					if ($scope.advices [i] === advice) {
						$scope.advices.splice(i, 1);
					}
				}
			} else {
				$scope.advice.$remove(function() {
					$location.path('advices');
				});
			}
		};

		// Update existing Advice
		$scope.update = function() {
			var advice = $scope.advice;

			advice.$update(function() {
				$location.path('advices/' + advice._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Advices
		$scope.find = function() {
			$scope.advices = Advices.query();
		};

		// Find existing Advice
		$scope.findOne = function() {
			$scope.advice = Advices.get({ 
				adviceId: $stateParams.adviceId
			});
		};
	}
]);