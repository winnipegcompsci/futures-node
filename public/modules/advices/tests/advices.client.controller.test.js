'use strict';

(function() {
	// Advices Controller Spec
	describe('Advices Controller Tests', function() {
		// Initialize global variables
		var AdvicesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Advices controller.
			AdvicesController = $controller('AdvicesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Advice object fetched from XHR', inject(function(Advices) {
			// Create sample Advice using the Advices service
			var sampleAdvice = new Advices({
				name: 'New Advice'
			});

			// Create a sample Advices array that includes the new Advice
			var sampleAdvices = [sampleAdvice];

			// Set GET response
			$httpBackend.expectGET('advices').respond(sampleAdvices);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.advices).toEqualData(sampleAdvices);
		}));

		it('$scope.findOne() should create an array with one Advice object fetched from XHR using a adviceId URL parameter', inject(function(Advices) {
			// Define a sample Advice object
			var sampleAdvice = new Advices({
				name: 'New Advice'
			});

			// Set the URL parameter
			$stateParams.adviceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/advices\/([0-9a-fA-F]{24})$/).respond(sampleAdvice);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.advice).toEqualData(sampleAdvice);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Advices) {
			// Create a sample Advice object
			var sampleAdvicePostData = new Advices({
				name: 'New Advice'
			});

			// Create a sample Advice response
			var sampleAdviceResponse = new Advices({
				_id: '525cf20451979dea2c000001',
				name: 'New Advice'
			});

			// Fixture mock form input values
			scope.name = 'New Advice';

			// Set POST response
			$httpBackend.expectPOST('advices', sampleAdvicePostData).respond(sampleAdviceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Advice was created
			expect($location.path()).toBe('/advices/' + sampleAdviceResponse._id);
		}));

		it('$scope.update() should update a valid Advice', inject(function(Advices) {
			// Define a sample Advice put data
			var sampleAdvicePutData = new Advices({
				_id: '525cf20451979dea2c000001',
				name: 'New Advice'
			});

			// Mock Advice in scope
			scope.advice = sampleAdvicePutData;

			// Set PUT response
			$httpBackend.expectPUT(/advices\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/advices/' + sampleAdvicePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid adviceId and remove the Advice from the scope', inject(function(Advices) {
			// Create new Advice object
			var sampleAdvice = new Advices({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Advices array and include the Advice
			scope.advices = [sampleAdvice];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/advices\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAdvice);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.advices.length).toBe(0);
		}));
	});
}());