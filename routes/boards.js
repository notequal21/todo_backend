var express = require('express');
const Board = require('../schema/board');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const boards = await Board.find({ userId: req.user.id });
  res.json(boards);
});

router.post('/', async function (req, res, next) {
  const newBoard = {
    title: req.body.title,
    userId: req.user.id,
    folderId: req.body.folderId,
  };
  const newBoardModel = await Board.create(newBoard);
  res.status(201).json(newBoardModel);
});

router.put('/:id', async function (req, res, next) {
  const updatedBoard = await Board.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title ? req.body.title : this.title,
      folderId: req.body.folderId ? req.body.folderId : this.folderId,
    },
    { new: true }
  );
  res.status(200).json(updatedBoard);
});

router.delete('/:id', async function (req, res, next) {
  const deletedBoard = await Board.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedBoard);
});

module.exports = router;
