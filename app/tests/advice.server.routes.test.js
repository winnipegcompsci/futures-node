'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Advice = mongoose.model('Advice'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, advice;

/**
 * Advice routes tests
 */
describe('Advice CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Advice
		user.save(function() {
			advice = {
				name: 'Advice Name'
			};

			done();
		});
	});

	it('should be able to save Advice instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advice
				agent.post('/advices')
					.send(advice)
					.expect(200)
					.end(function(adviceSaveErr, adviceSaveRes) {
						// Handle Advice save error
						if (adviceSaveErr) done(adviceSaveErr);

						// Get a list of Advices
						agent.get('/advices')
							.end(function(advicesGetErr, advicesGetRes) {
								// Handle Advice save error
								if (advicesGetErr) done(advicesGetErr);

								// Get Advices list
								var advices = advicesGetRes.body;

								// Set assertions
								(advices[0].user._id).should.equal(userId);
								(advices[0].name).should.match('Advice Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Advice instance if not logged in', function(done) {
		agent.post('/advices')
			.send(advice)
			.expect(401)
			.end(function(adviceSaveErr, adviceSaveRes) {
				// Call the assertion callback
				done(adviceSaveErr);
			});
	});

	it('should not be able to save Advice instance if no name is provided', function(done) {
		// Invalidate name field
		advice.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advice
				agent.post('/advices')
					.send(advice)
					.expect(400)
					.end(function(adviceSaveErr, adviceSaveRes) {
						// Set message assertion
						(adviceSaveRes.body.message).should.match('Please fill Advice name');
						
						// Handle Advice save error
						done(adviceSaveErr);
					});
			});
	});

	it('should be able to update Advice instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advice
				agent.post('/advices')
					.send(advice)
					.expect(200)
					.end(function(adviceSaveErr, adviceSaveRes) {
						// Handle Advice save error
						if (adviceSaveErr) done(adviceSaveErr);

						// Update Advice name
						advice.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Advice
						agent.put('/advices/' + adviceSaveRes.body._id)
							.send(advice)
							.expect(200)
							.end(function(adviceUpdateErr, adviceUpdateRes) {
								// Handle Advice update error
								if (adviceUpdateErr) done(adviceUpdateErr);

								// Set assertions
								(adviceUpdateRes.body._id).should.equal(adviceSaveRes.body._id);
								(adviceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Advices if not signed in', function(done) {
		// Create new Advice model instance
		var adviceObj = new Advice(advice);

		// Save the Advice
		adviceObj.save(function() {
			// Request Advices
			request(app).get('/advices')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Advice if not signed in', function(done) {
		// Create new Advice model instance
		var adviceObj = new Advice(advice);

		// Save the Advice
		adviceObj.save(function() {
			request(app).get('/advices/' + adviceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', advice.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Advice instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advice
				agent.post('/advices')
					.send(advice)
					.expect(200)
					.end(function(adviceSaveErr, adviceSaveRes) {
						// Handle Advice save error
						if (adviceSaveErr) done(adviceSaveErr);

						// Delete existing Advice
						agent.delete('/advices/' + adviceSaveRes.body._id)
							.send(advice)
							.expect(200)
							.end(function(adviceDeleteErr, adviceDeleteRes) {
								// Handle Advice error error
								if (adviceDeleteErr) done(adviceDeleteErr);

								// Set assertions
								(adviceDeleteRes.body._id).should.equal(adviceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Advice instance if not signed in', function(done) {
		// Set Advice user 
		advice.user = user;

		// Create new Advice model instance
		var adviceObj = new Advice(advice);

		// Save the Advice
		adviceObj.save(function() {
			// Try deleting Advice
			request(app).delete('/advices/' + adviceObj._id)
			.expect(401)
			.end(function(adviceDeleteErr, adviceDeleteRes) {
				// Set message assertion
				(adviceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Advice error error
				done(adviceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Advice.remove().exec();
		done();
	});
});