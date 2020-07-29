
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, username: 'Kristian', post_id: 2, text: "Nice dog. Sure would be a shame >:)"},
        {id: 2, username: 'Timmy', post_id: 2, text: "Stay awake from doggo >:("}
      ]);
    });
};
