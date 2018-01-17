var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('Logging In', function() {
  it('should log Borat into the app with the correct password', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({
        'username': 'Borat',
        'password': 'borat'
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
        'username': 'Borat',
        'password': 'notborat'
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
        'username': 'Admin',
        'password': 'admin'
      })
      .end(function(err, res) {
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
