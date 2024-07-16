require('cors')

const cors_options = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
}

module.exports = cors_options
