var bcrypt = require('bcryptjs');
var faker = require('faker');
var User = require('../../models/user');

function profiles() {
  var profiles = [
    {username: 'Michael', hash: hash('michael'), email: 'michael@fullfeaturex.com'},
    {username: 'Borat', hash: hash('borat'), email: 'borat@fullfeaturex.com'},
    {username: 'Admin', hash: hash('admin'), email: 'admin@fullfeaturex.com', type: 1}
  ];
  if (process.env.NODE_ENV == 'development') {
    for (var i = 0; i < 100; i++) {
      profiles.push({
        username: faker.internet.userName(),
        hash: hash(faker.internet.password()),
        email:faker.internet.email()
      });
    }
  }
  return profiles;
}

function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(profiles()); // Adds in the profiles
    });
};
