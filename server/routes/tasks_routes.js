const express = require('express')
const task_controller = require('../controllers/tasks_controller')
const router = express.Router()

// prettier-ignore
router.route('/')
  .get(task_controller.get_all_tasks)
  .post(task_controller.create_task)
// prettier-ignore
router.route('/')
  .get(task_controller.get_task)
  .patch(task_controller.update_task)
  .delete(task_controller.delete_task)

module.exports = router
