var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var should = chai.should();
var knex = require('knex')(require('../knexfile').test);
var passportStub = require('passport-stub');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : user', function() {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe('GET /users', function() {
    it('should display users', function(done) {
      chai.request(server)
      .get('/users')
      .end(function(err, res) {
        res.status.should.equal(200);
        res.redirects.length.should.equal(0);
        done();
      });
    })
  });

  describe('POST /users/login', function() {
    it('should log Borat into the app with the correct password', function(done) {
      chai.request(server)
      .post('/users/login')
      .send({
        username: 'Borat',
        password: 'borat'
      })
      .end(function(err, res) {
        res.status.should.equal(200);
        res.redirects.length.should.equal(2);
        done();
      });
    });
    it('should fail to log Borat into the app with the wrong password', function(done) {
      chai.request(server)
      .post('/users/login')
      .send({
        username: 'Borat',
        password: 'notborat'
      })
      .end(function(err, res) {
        res.status.should.equal(200);
        res.redirects.length.should.equal(1);
        done();
      });
    });
    it('should log in the admin account', function(done) {
      chai.request(server)
      .post('/users/login')
      .send({
        username: 'Admin',
        password: 'admin'
      })
      .end(function(err, res) {
        res.status.should.equal(200);
        res.redirects.length.should.equal(2);
        done();
      });
    });
  });

  describe('POST /users/register', function() {
    it('should create user Steve', function(done) {
      chai.request(server)
      .post('/users/register')
      .send({
        username: 'Steve',
        password: 'steve',
        confirmpassword: 'steve',
        email: 'steve@fullfeaturex.com'
      })
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
    });
  });

  // //TODO: make this test actually work
  // describe('POST /users/profile', function() { //this test passes but doesn't work
  //   it('should change the username Michael to Micool', function(done) {
  //     passportStub.login({
  //       username: 'Michael',
  //       password: 'michael'
  //     });
  //     chai.request(server)
  //     .post('/users/profile')
  //     .send({
  //       username: 'Micool'
  //     })
  //     .end(function(err, res) {
  //       res.status.should.equal(200);
  //       // res.redirects.length.should.equal(2);
  //       done();
  //     });
  //   });
  // });

});
