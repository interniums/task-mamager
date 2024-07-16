const Task = require('../models/task_model')

// tasks controller
const get_all_tasks = (req, res) => {
  res.send('get all task')
}

const create_task = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Invalid data.' })
  }
  try {
    const task = await Task.create(req.body)
    console.log(task)
    res.status(201).json({ message: `Task ${task._id} created.` })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const get_task = (req, res) => {
  res.send('get task')
}

const update_task = (req, res) => {
  res.send('update task')
}

const delete_task = (req, res) => {
  res.send('delete task')
}

module.exports = {
  get_all_tasks,
  create_task,
  get_task,
  update_task,
  delete_task,
}
