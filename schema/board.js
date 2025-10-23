const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: false,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

boardSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
