const { Router } = require('express');

const TaskEntry = require('../models/TaskEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await TaskEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const taskEntry = new TaskEntry(req.body);
    const createdEntry = await taskEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;