const User = require('../models/user_model')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const get_home = asyncHandler(async (req, res, next) => {})

module.exports = { get_home }
