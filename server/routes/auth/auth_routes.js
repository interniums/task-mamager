const express = require('express')
const auth_router = express.Router()
const auth_controller = require('../../controllers/auth/auth_controller')

auth_router.post('/sign-up', auth_controller.registr)
auth_router.post('/sign-in', auth_controller.login)

module.exports = auth_router
