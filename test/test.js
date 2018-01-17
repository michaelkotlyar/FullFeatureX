var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('GET /users', function() {
  it('display users', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        done();
      });
  })
});

describe('POST /users/login', function() {
  it('log Borat into the app with the correct password', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({
        'username': 'Borat',
        'password': 'borat'
      })
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        res.redirects.length.should.equal(2);
        done();
      });
  });
  it('fail to log Borat into the app with the wrong password', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({
        'username': 'Borat',
        'password': 'notborat'
      })
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        res.redirects.length.should.equal(1);
        done();
      });
  });
  it('log in the admin account', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({
        'username': 'Admin',
        'password': 'admin'
      })
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        res.redirects.length.should.equal(2);
        done();
      });
  });
});

// describe('', function() {
//   it('', function(done) {
//     chai.request(server)
//     .end(function(err, res) {
//       done();
//     });
//   })
// });
