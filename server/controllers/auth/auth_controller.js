const User = require('../../models/user_model')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const registr = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid data recieved.' })
  }

  const dublicate = await User.findOne({ email }).lean().exec()
  if (dublicate) {
    return res.status(400).json({ message: `Email taken.` })
  }

  const hash = await bcrypt.hash(password, 10)
  if (!hash) {
    return res
      .status(400)
      .json({ message: 'There`s an error with hashing your password.' })
  }
  const new_user = await User.create({ email, password: hash })

  if (new_user) {
    res.status(200).json({ message: `New user ${new_user._id} created.` })
  } else {
    res.status(400).json({ message: 'Invalid user data recieved.' })
  }
})

module.exports = { registr }
