/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username: "sam", email: 'sam@gmail.com',password: "123",},
    {username: "james", email: 'james@gmail.com',password: "123",},
    {username: "riley", email: 'riley@gmail.com',password: "123",}
  ]);
};
