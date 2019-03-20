exports.up = function(knex, Promise) {
  return (knex.schema
    .createTable('tags', function(t) {
      t.integer('rowid').primary();
      t.text('title').notNull();
    })
    .createTable('note_tags', function(t) {
      t.integer('noteid').notNull().references('notes.rowid');
      t.integer('tagid').notNull().references('tags.rowid');
      t.primary(['noteid', 'tagid'])
    })
  )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags').dropTable('note_tags')
};
