const Task = require('../models/task_model')

// tasks controller
const get_all_tasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const create_task = async (req, res) => {
  const name = req.body.name
  if (!name) {
    return res.status(400).json({ message: 'Invalid data.' })
  }
  try {
    const task = await Task.create({ name })
    console.log(task)
    res.status(201).json({ message: `Task ${task._id} created.` })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const get_task = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Provide task id.' })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id })

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task ${req.params.id} doesnt exist.` })
    }

    res.status(200).json({ message: `Success. Task: ${task}` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const update_task = async (req, res) => {
  const _id = req.body._id
  if (!_id) {
    return res.status(400).json({ message: 'Invalid _id recieved.' })
  }
  try {
    const task = await Task.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res
        .status(400)
        .json({ message: `Task with provided id ${_id} doesnt exist.` })
    }
    res.status(200).json({ message: `Task updated. Updated task ${task}` })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const delete_task = async (req, res) => {
  const id = req.body._id
  try {
    const task = await Task.findOneAndDelete({ _id: id })
    if (!task) {
      return res.status(404).json({
        message: `Task with provided id: ${id} doesnt exist.`,
      })
    }
    res.status(200).json({ message: `Task ${id} deleted.` })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  get_all_tasks,
  create_task,
  get_task,
  update_task,
  delete_task,
}
