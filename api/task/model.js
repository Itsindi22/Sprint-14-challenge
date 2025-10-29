const knex = require('knex');
const config = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

async function getAll() {
  const rows = await db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    );

  return rows.map(row => ({
    task_id: row.task_id,
    task_description: row.task_description,
    task_notes: row.task_notes || null,
    task_completed: row.task_completed ? true : false, // ✅ boolean
    project_name: row.project_name,
    project_description: row.project_description
  }));
}

async function add(task) {
  const toInsert = {
    task_description: task.task_description,
    task_notes: task.task_notes,
    task_completed: task.task_completed ? 1 : 0,
    project_id: task.project_id
  };

  const [id] = await db('tasks').insert(toInsert);
  const saved = await db('tasks').where('task_id', id).first();

  return {
    task_id: saved.task_id,
    task_description: saved.task_description,
    task_notes: saved.task_notes || null,
    task_completed: saved.task_completed ? true : false, // ✅ boolean again
    project_id: saved.project_id
  };
}

module.exports = { getAll, add };
