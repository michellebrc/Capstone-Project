/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("cart", (table) => {
      table.increments();
      table.integer("user_id");
      table.foreign("user_id").references("users.id");
      table.integer("menu_id");
      table.foreign("menu_id").references("menu.id");
      table.integer("quantity");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("cart");
  };
  