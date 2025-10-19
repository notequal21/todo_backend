const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Можно добавить дополнительные поля, например дату создания
});

listSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
