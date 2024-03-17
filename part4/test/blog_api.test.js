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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new_test1',
    author: 'new_test_author1',
    url: 'new_url_test1',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('new_test1')
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Test Blog without Likes',
    author: 'Test Author',
    url: 'http://testblogwithoutlikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)

  const blogsAtEnd = await helper.blogInDb()
  const createdBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
  expect(createdBlog).toBeDefined()
  expect(createdBlog.likes).toBe(0)
})

describe('creation of new blogs', () => {
  test('responds with 400 Bad Request if title is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Missing Title Author',
      url: 'http://missingtitle.com',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)


    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('responds with 400 Bad Request if url is missing', async () => {
    const newBlogWithoutUrl = {
      title: 'Missing URL',
      author: 'Missing URL Author',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
