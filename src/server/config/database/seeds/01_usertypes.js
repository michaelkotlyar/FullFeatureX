exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_types').insert([
        {type: 0, title: 'user'},
        {type: 1, title: 'admin'},
      ]);
    });
};
