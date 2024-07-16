const mongoose = require('mongoose')

const task_schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name should exist.'],
    trim: true,
    maxLength: [24, 'Name cannot be more than 24 characters.'],
    minlength: [3, 'Name should be more than 3 characters.'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', task_schema)
