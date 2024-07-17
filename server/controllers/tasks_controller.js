const Task = require('../models/task_model')
const asyncHandler = require('express-async-handler')

// tasks controller
const get_all_tasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({})

  if (!tasks) {
    return res.status(404).json({ message: 'No tasks found.' })
  }
  res.status(200).json({ tasks })
})

const create_task = asyncHandler(async (req, res) => {
  const name = req.body.name
  if (!name) {
    return res.status(400).json({ message: 'Invalid name provided.' })
  }

  const task = await Task.create({ name })

  if (!task) {
    return res
      .status(400)
      .json({ message: 'An error occured when creating a task.' })
  }
  res.status(201).json({ message: `Task ${name}, ${task._id} created.` })
})

const get_task = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Provide task id.' })
  }

  const task = await Task.findOne({ _id: req.params.id })

  if (!task) {
    return res
      .status(404)
      .json({ message: `Task ${req.params.id} doesnt exist.` })
  }

  res.status(200).json({ message: `Success. Task: ${task}` })
})

const update_task = asyncHandler(async (req, res) => {
  const _id = req.body._id
  if (!_id) {
    return res.status(400).json({ message: 'Provide task id.' })
  }

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
})

const delete_task = asyncHandler(async (req, res) => {
  const id = req.body._id
  if (!id) {
    return res.status(400).json({ message: 'Provide task id.' })
  }

  const task = await Task.findOneAndDelete({ _id: id })
  if (!task) {
    return res.status(404).json({
      message: `Task with provided id: ${id} doesnt exist.`,
    })
  }
  res.status(200).json({ message: `Task ${id} deleted.` })
})

module.exports = {
  get_all_tasks,
  create_task,
  get_task,
  update_task,
  delete_task,
}
