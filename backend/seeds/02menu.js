/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('menu').del()
  await knex('menu').insert([
    {user_id: 1, name: 'Redmi K30', image:"1.jpg", price: 3000},
    {user_id: 2, name: 'Apple', image:"2.png", price: 6000},
    {user_id: 3, name: 'Samsung', image:"3.jpg", price: 5000}
  ]);
};
