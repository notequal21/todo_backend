var express = require('express');
const List = require('../schema/list');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const lists = await List.find();
  res.json(lists);
});

router.post('/', async function (req, res, next) {
  const newList = {
    title: req.body.title,
  };
  const newListModel = await List.create(newList);
  res.status(201).json(newListModel);
});

router.put('/:id', async function (req, res, next) {
  const updatedList = await List.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );
  res.status(200).json(updatedList);
});

router.delete('/:id', async function (req, res, next) {
  const deletedList = await List.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedList);
});

module.exports = router;
