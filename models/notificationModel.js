const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Notification', notificationSchema);
