// build your `/api/tasks` router here
const express = require('express');
const knex = require('knex');
const config = require('../../knexfile');
const Model = require('./model');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);
const router = express.Router();

// [GET] /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Model.getAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { task_description, project_id, task_notes, task_completed } = req.body;

    if (!task_description || !project_id) {
      return res.status(400).json({ message: 'task_description and project_id are required' });
    }

    // Verify project exists
    const project = await db('projects').where('project_id', project_id).first();
    if (!project) {
      return res.status(400).json({ message: 'Invalid project_id' });
    }

    const newTask = await Model.add({
      task_description,
      task_notes,
      task_completed,
      project_id
    });

    res.status(201).json(newTask); 
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = router;
