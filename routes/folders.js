const express = require('express');
const Folder = require('../schema/folder');
const router = express.Router();

router.get('/', async function (req, res, next) {
  const folders = await Folder.find({ userId: req.user.id });
  res.json(folders);
});

router.post('/', async function (req, res, next) {
  const newFolder = {
    title: req.body.title,
    userId: req.user.id,
  };
  const newFolderModel = await Folder.create(newFolder);
  res.status(201).json(newFolderModel);
});

router.put('/:id', async function (req, res, next) {
  const updatedFolder = await Folder.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title ? req.body.title : this.title },
    { new: true }
  );
  res.status(200).json(updatedFolder);
});

router.delete('/:id', async function (req, res, next) {
  const deletedFolder = await Folder.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedFolder);
});

module.exports = router;
