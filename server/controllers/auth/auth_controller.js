const User = require('../../models/user_model')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registr = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid data recieved.' })
  }

  const dublicate = await User.findOne({ email }).lean().exec()
  if (dublicate) {
    return res.status(409).json({ message: `Email taken.` })
  }

  const hash = await bcrypt.hash(password, 10)
  if (!hash) {
    return res
      .status(400)
      .json({ message: 'There`s an error with hashing your password.' })
  }
  const new_user = await User.create({ email, password: hash })

  if (new_user) {
    res.status(200).json({ message: `New user created. ID ${new_user._id}` })
  }
})

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid data provided.' })
  }

  const user = await User.findOne({ email }).exec()
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with provided email not found.` })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(400).json({ message: 'Incorrect password.' })
  }

  if (user && match) {
    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.status(200).json({ message: `Logined successfully.`, token })
  } else {
    res.status(400).json({ message: 'Invalid user data recieved.' })
  }
})

module.exports = { registr, login }
