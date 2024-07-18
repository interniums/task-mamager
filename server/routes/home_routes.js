const express = require('express')
const home_controller = require('../controllers/home_controller')
const router = express.Router()

router.route('/').get(home_controller.get_home)

module.exports = router
