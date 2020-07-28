
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 128)
        .unique()
        .notNullable();
      tbl.string('email', 128)
        .unique()
        .notNullable();
      tbl.text('name', 128)
        .notNullable();
      tbl.string('password', 128)
        .notNullable();
      tbl.string('location', 128)
        .notNullable();
  })
  .createTable('posts', tbl => {
      tbl.increments();
      tbl.string('img_url', 128).notNullable();
      tbl.string('title', 128).notNullable();
      tbl.string('description', 128);
      tbl.string('location', 128);
      tbl.integer("username").notNullable()
        .unsigned()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
  })
  .createTable('comments', tbl => {
      tbl.increments();
      tbl.integer("username").notNullable()
        .unsigned()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
      tbl.integer("post_id").notNullable()
        .unsigned()
        .references("id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
      tbl.string("text").notNullable()
  })
  .createTable('likes', tbl => {
    tbl.increments();
    tbl.integer("username").notNullable()
      .unsigned()
      .references("username")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT")
    tbl.integer("post_id").notNullable()
      .unsigned()
      .references("id")
      .inTable("posts")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT")
})
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts')
    .dropTableIfExists('comments')
    .dropTableIfExists('likes')
};
