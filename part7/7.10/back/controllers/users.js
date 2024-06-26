const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const getUser = await User.findOne({ username: username })
  if (getUser) return response.status(400).json({ error: 'username already exists' })

  if (username.length < 3 || password.length < 3) return response.status(400).json({ error: 'The password or username is not greater than 3' })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const users = await User.findOne({_id: request.params.id}).populate('blogs', { title: 1, url: 1, author: 1 })
  response.json(users)
})

module.exports = usersRouter