/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('menu', (table)=>{
        table.increments();
        table.integer("user_id");
        table.foreign("user_id").references("users.id");
        table.string("name");
        table.string("image");
        table.integer("price");
        table.timestamps(false,true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menu');
};
