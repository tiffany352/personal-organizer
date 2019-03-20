
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(t) {
    t.integer('rowid').primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();

    t.text('title').notNull();
    t.text('contents').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};
