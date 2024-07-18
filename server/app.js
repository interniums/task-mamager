const express = require('express')
const app = express()
const connect_db = require('./db/connect')
const PORT = 3000
const tasks_routes = require('./routes/tasks_routes')
const auth_routes = require('./routes/auth/auth_routes')
const home_routes = require('./routes/home_routes')
const cors = require('cors')
const cors_options = require('./config/cors_options')
const not_found = require('./middleware/not_found')
const asyncHandler = require('express-async-handler')
const jwtVerify = require('./middleware/jwtVerify')
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors(cors_options))

// routes
app.use('/api/v1/auth', auth_routes)

// protected routes
app.use(jwtVerify)
app.use('api/v1/home', home_routes)
app.use('/api/v1/tasks', tasks_routes)

app.use(not_found)
const start = asyncHandler(async () => {
  await connect_db(process.env.MONGO_URI)
  app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
})
start()
