var express = require('express');
var router = express.Router();
const Task = require('../schema/task');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const tasks = await Task.find({
    userId: req.user.id,
  });

  res.json(tasks);
});

// Create a new task
router.post('/', async function (req, res, next) {
  const newTask = {
    title: req.body.title,
    completed: false,
    listId: req.body.listId ? req.body.listId : 'general',
    userId: req.user.id,
  };
  const newTaskModel = await Task.create(newTask);
  res.status(201).json(newTaskModel);
});

// Update a task
router.put('/toggle/:id', async function (req, res, next) {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      completed: req.body.completed,
    },
    { new: true }
  );
  res.status(200).json(updatedTask);
});
router.put('/update/:id', async function (req, res, next) {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title ? req.body.title : this.title,
      listId: req.body.listId ? req.body.listId : this.listId,
    },
    { new: true }
  );
  res.status(200).json(updatedTask);
});

// Delete a task
router.delete('/:id', async function (req, res, next) {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedTask);
});

module.exports = router;
