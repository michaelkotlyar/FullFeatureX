var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var should = chai.should();

require('mocha-jscs')();
require('mocha-jshint')({
  paths: ['./src/']
});

chai.use(chaiHttp);

describe('routes : index', function() {
  console.log('I"m just testing');
});
