exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments('project_id');
    table.string('project_name').notNullable();
    table.string('project_description');
    // store as integer 0 or 1; default 0
    table.integer('project_completed').notNullable().defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
