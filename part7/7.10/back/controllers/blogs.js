const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body
  console.log({ title, url, author, likes })
  const decodedUser = request.user

  const user = await User.findById(decodedUser)

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  result.user = user
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    console.log(blog)
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes
  }

  const existBlog = await Blog.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } }, { new: true })


  response.status(203).json(existBlog)

})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const decodedUser = request.user
  const user = await User.findById(decodedUser)
  console.log(user)
  if (blog.user.toString() !== user._id.toString()) return response.status(401).json({ error: 'unauthorized' })
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id/comments', async (request, response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: request.body.comment } },
      { new: true }  
    )
    response.status(200).json(blog)
  } catch (error) {
    console.log(error)
  }
})



module.exports = blogsRouter