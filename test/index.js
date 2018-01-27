var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('routes : index', function() {
  describe('GET /', function() {
    it('should go to homepage but be directed to login ', function(done) {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.redirects.length.should.equal(1);
        done();
      });
    });
  });
});

// describe('', function() {
//   it('should ', function(done) {
//     chai.request(server)
//     .end(function(err, res) {
//       done();
//     });
//   });
// });
