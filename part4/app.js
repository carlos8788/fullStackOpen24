const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const {MONGODB_URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const app = express()



mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app

