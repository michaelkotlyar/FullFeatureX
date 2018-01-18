var bcrypt = require('bcryptjs');

function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Michael', hash: hash('michael'), email: 'michael@fullfeaturex.com'},
        {username: 'Borat', hash: hash('borat'), email: 'borat@fullfeaturex.com'},
        {username: 'Admin', hash: hash('admin'), email: 'admin@fullfeaturex.com', type: 1}
      ]);
    });
};
