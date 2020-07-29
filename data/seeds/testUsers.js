
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Timmy', email: 'timmy@hotmail.com', name: 'Timmy', location: 'United States', password: '$2a$08$XtYXb5I23Xz12.2DdS1poO0NJjmhS/fhd/h4.OiPWrJm8t8T42xYe'},
        {id: 2, username: 'Kristian', email: 'kristian@hotmail.com', name: 'Kristian', location: 'United States', password: '$2a$08$XtYXb5I23Xz12.2DdS1poO0NJjmhS/fhd/h4.OiPWrJm8t8T42xYe'}
      ]);
    });
};
