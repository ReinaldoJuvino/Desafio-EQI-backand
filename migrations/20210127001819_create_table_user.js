exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name',50).notNull().unique();
        table.string('phone',20).notNull().unique();
        table.string('email',50).notNull().unique();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
