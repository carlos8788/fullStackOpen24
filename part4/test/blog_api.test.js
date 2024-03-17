const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Exist id property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.body.length).toBeGreaterThan(0) 
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
