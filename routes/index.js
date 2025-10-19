var express = require('express');
var router = express.Router();
const Task = require('../schema/task');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.json({ message: 'Hello World' });
});

module.exports = router;
