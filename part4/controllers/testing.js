const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('123456', 10)
  await User.create({
    username: 'test_user',
    name: 'test_user',
    passwordHash: passwordHash
  })
  response.status(204).end()
})

module.exports = testingRouter