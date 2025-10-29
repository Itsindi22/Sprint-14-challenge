// build your `Resource` model here
const knex = require('knex');
const config = require('../../knexfile');

// Automatically pick the right environment (testing or development)
const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

async function getAll() {
  return await db('resources');
}

async function add(resource) {
  const [id] = await db('resources').insert({
    resource_name: resource.resource_name,
    resource_description: resource.resource_description
  });
  return db('resources').where('resource_id', id).first();
}

module.exports = {
  getAll,
  add
};
