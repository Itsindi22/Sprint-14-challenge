// build your `/api/resources` router here
const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Model.getAll();
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.resource_name) {
      return res.status(400).json({ message: 'resource_name is required' });
    }
    // unique constraint on resource_name will throw if duplicate
    const resource = await Model.add(payload);
    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    if (err && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ message: 'resource_name must be unique' });
    }
    res.status(500).json({ message: 'Failed to create resource' });
  }
});

module.exports = router;
