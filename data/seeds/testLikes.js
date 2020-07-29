
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {id: 1, username: 'Kristian', post_id: 2},
        {id: 2, username: 'Timmy', post_id: 2}
      ]);
    });
};
