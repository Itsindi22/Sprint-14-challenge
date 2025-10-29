const db = require('../../data/dbConfig');

async function getAll() {
  const rows = await db('projects');
  return rows.map(project => ({
    project_id: project.project_id,
    project_name: project.project_name,
    project_description: project.project_description,
    project_completed: project.project_completed ? true : false
  }));
}

async function add(project) {
  const toInsert = {
    project_name: project.project_name,
    project_description: project.project_description,
    project_completed: project.project_completed ? 1 : 0
  };

  const [id] = await db('projects').insert(toInsert);
  const saved = await db('projects').where('project_id', id).first();

  return {
    project_id: saved.project_id,
    project_name: saved.project_name,
    project_description: saved.project_description,
    project_completed: saved.project_completed ? true : false
  };
}

module.exports = { getAll, add };
