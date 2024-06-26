const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')
const {MONGODB_URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()



mongoose.connect(MONGODB_URI)

app.use(cors('*'))
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)

module.exports = app

