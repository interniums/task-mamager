const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  tasks: {
    type: [mongoose.Schema.ObjectId],
    default: [],
  },
})

module.exports = mongoose.model('User', user_schema)
