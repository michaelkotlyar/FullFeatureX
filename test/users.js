var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var should = chai.should();
var knex = require('knex')(require('../knexfile').test);

chai.use(chaiHttp);

describe('routes : user', function() {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
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

});
