
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, img_url: 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2020/06/james-1dd1.jpg', title: "Hahaha, my brother likes James Charles.", description: "Need I say more?", location: "ma house", username: "Kristian"},
        {id: 2, img_url: 'https://static01.nyt.com/images/2019/01/01/opinion/01brooksWeb/merlin_148630314_4eca699a-e353-4dd5-9607-2f56c0a61674-articleLarge.jpg', title: "cute dog lol", description: "doggy doggy :)", location: "ma crib", username: "Timmy"}
      ]);
    });
};
