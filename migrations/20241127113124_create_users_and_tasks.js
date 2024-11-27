exports.up = function(knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('username');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('tasks', function (table) {
        table.increments('id').primary();
        table.integer('user_id').references('users.id').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('description');
        table.date('deadline');
        table.enu('priority', ['low', 'medium', 'high']).defaultTo('low');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('tasks')
      .dropTableIfExists('users');
  };
  