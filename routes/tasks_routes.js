const express = require('express')
const {
  get_all_tasks,
  create_task,
  get_task,
  update_task,
  delete_task,
} = require('../controllers/tasks_controller')
const router = express.Router()

// prettier-ignore
router.route('/')
  .get(get_all_tasks)
  .post(create_task)
// prettier-ignore
router.route('/:id')
  .get(get_task)
  .patch(update_task)
  .delete(delete_task)

module.exports = router
