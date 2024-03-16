const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs = []) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog);
}

const mostBlogs = (blogs = []) => {
  const authors = [];
  blogs.forEach(blog => {
    const index = authors.findIndex(author => author.author === blog.author);
    if (index !== -1) {
      authors[index] = { ...authors[index], blogs: authors[index].blogs + 1 }
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
  })
  return authors.reduce((most, blog) => most.blogs > blog.blogs ? most : blog);
}

const mostLikes = (blogs = []) => {
  const authors = [];
  blogs.forEach(blog => {
    const index = authors.findIndex(author => author.author === blog.author);
    if (index !== -1) {
      authors[index] = { ...authors[index], likes: authors[index].likes + blog.likes }
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  })
  return authors.reduce((most, blog) => most.likes > blog.likes ? most : blog);
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}