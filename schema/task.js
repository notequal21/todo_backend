const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  listId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'List',
    required: true,
  },
});

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
