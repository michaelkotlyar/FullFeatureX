var config = require('../../../../knexfile')[process.env.NODE_ENV || 'development'];
var knex = require('knex')(config);

var Model = require('objection').Model;
Model.knex(knex);
