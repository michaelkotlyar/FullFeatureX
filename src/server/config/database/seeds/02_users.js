var faker = require('faker');
var bcrypt = require('bcryptjs');

function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

function users() {
  var usersArray = [
    {username: 'Michael', hash: hash('michael'), email: 'michael@fullfeaturex.com'},
    {username: 'Borat', hash: hash('borat'), email: 'borat@fullfeaturex.com'},
    {username: 'Admin', hash: hash('admin'), email: 'admin@fullfeaturex.com', type: 1}
  ];
  if (process.env.NODE_ENV == 'development') {
    for (var i = 0; i < 100; i++) {
      usersArray.push({
        username: faker.internet.userName(),
        hash: hash(faker.internet.password()),
        email:faker.internet.email()
      });
    }
  }
  return usersArray;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users()); // Adds in the users
    });
};
