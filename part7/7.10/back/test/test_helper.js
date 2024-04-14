const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test1',
    author: 'test_author1',
    url: 'url_test1',
    likes: 5
  },
  {
    title: 'test2',
    author: 'test_author2',
    url: 'url_test2',
    likes: 4
  },
  {
    title: 'test3',
    author: 'test_author3',
    url: 'url_test3',
    likes: 3
  }
]

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogInDb
}