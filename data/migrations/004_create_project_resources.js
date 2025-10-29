exports.up = function(knex) {
  return knex.schema.createTable('project_resources', table => {
    table.increments('project_resource_id');
    table.integer('project_id')
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('resource_id')
      .inTable('resources')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // optional: ensure a resource is not attached twice to same project
    table.unique(['project_id','resource_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project_resources');
};
