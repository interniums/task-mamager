const express = require('express')
const app = express()
const connect_db = require('./db/connect')
const PORT = 3000
const tasks_routes = require('./routes/tasks_routes')
const cors = require('cors')
const cors_options = require('./config/cors_options')
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors(cors_options))

// routes
app.use('/api/v1/tasks', tasks_routes)

const start = async () => {
  try {
    await connect_db(process.env.MONGO_URI)
    app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
  } catch (err) {
    console.error(err)
  }
}
start()
