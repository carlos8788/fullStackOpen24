/* eslint-disable semi */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token;
let user;
beforeAll(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send({ username: 'testuser', password: 'testpass', name: 'Test User' });

  const result = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpass' });

  token = result.body.token;
  user = await User.findOne({ username: 'testuser'});
});

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => {
    blog.user = user._id;
    return blog.save();
  })
  await Promise.all(promiseArray)
})

describe('Get blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Exist id property', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].id).toBeDefined()
  })
})


describe('creation of new blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new_test1',
      author: 'new_test_author1',
      url: 'new_url_test1',
      likes: 5
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

    const blogsAtEnd = await helper.blogInDb()
    const createdBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(createdBlog).toBeDefined()
    expect(createdBlog.likes).toBe(0)
  })


  test('responds with 400 Bad Request if title is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Missing Title Author',
      url: 'http://missingtitle.com',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete blog', () => {
  test('responds with 204 when blog is deleted', async () => {
    const blogs = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
    const blogId = blogs.body[0].id
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
