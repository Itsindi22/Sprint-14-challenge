exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id');
    table.string('task_description').notNullable();
    table.string('task_notes');
    // store as integer 0 or 1; default 0
    table.integer('task_completed').notNullable().defaultTo(0);
    table.integer('project_id')
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};
