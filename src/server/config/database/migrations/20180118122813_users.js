exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('hash').notNullable();
    table.string('email').unique().notNullable();
    table.integer('type').references('user_types.type').defaultTo(0);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
