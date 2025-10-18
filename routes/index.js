var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'utils', 'todos.json');

// Function to save array of tasks to file
function saveTodosToFile(todos) {
  fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error saving file:', err);
    } else {
      console.log('Tasks successfully saved to file');
    }
  });
}

// Load tasks from file at startup (if file exists)
let todos = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  todos = JSON.parse(data);
} else {
  todos = [];
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json(todos);
});

router.post('/', function (req, res, next) {
  const todo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    completed: false,
  };
  todos.push(todo);
  saveTodosToFile(todos);
  res.status(201).json(todo);
});

router.put('/:id', function (req, res, next) {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  if (req.body.title !== undefined && req.body.title !== null) {
    todo.title = req.body.title;
  }
  if (req.body.completed !== undefined && req.body.completed !== null) {
    todo.completed = req.body.completed;
  }
  saveTodosToFile(todos);
  res.status(200).json(todo);
});

router.delete('/:id', function (req, res, next) {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todos.splice(todos.indexOf(todo), 1);
  saveTodosToFile(todos);
  res.status(200).json({ message: 'Todo deleted' });
});

module.exports = router;
