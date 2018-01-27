var chai = require('chai');
var chaiHttp = require('chai-http');
var eslint = require('mocha-eslint');
var server = require('../src/server/app');
var should = chai.should();

// Do eslint test first
var paths = [
  'src'
];

var options = {
  formatter: 'compact',
  timeout: 5000,
  slow: 1000,
  strict: true,
};

eslint(paths, options);

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
