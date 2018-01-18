exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_types', function(table) {
    table.integer('type').unique().notNullable();
    table.string('title').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_types');
};
