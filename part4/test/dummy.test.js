const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })


})

test('blog favorite', () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 13
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 10
    }
  ]
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual({
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 13
  })
})

test('most blogs', () => {
  const blogs = [
    {
      title: "The Art of Computer Programming",
      author: "Donald E. Knuth",
      likes: 300
    },
    {
      title: "Coders at Work: Reflections on the Craft of Programming",
      author: "Peter Seibel",
      likes: 300
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "A Case against the GO TO Statement",
      author: "Edsger W. Dijkstra",
      likes: 25
    },
    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Edsger W. Dijkstra",
      likes: 35
    }
  ]
  const result = listHelper.mostBlogs(blogs)
  expect(result).toEqual({ 
    author: 'Harold Abelson and Gerald Jay Sussman', 
    blogs: 3 
  })
})

test('most blogs', () => {
  const blogs = [
    {
      title: "The Art of Computer Programming",
      author: "Donald E. Knuth",
      likes: 300
    },
    {
      title: "Coders at Work: Reflections on the Craft of Programming",
      author: "Peter Seibel",
      likes: 300
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "The Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      likes: 28
    },
    {
      title: "A Case against the GO TO Statement",
      author: "Edsger W. Dijkstra",
      likes: 25
    },
    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Edsger W. Dijkstra",
      likes: 35
    }
  ]
  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual({ author: 'Peter Seibel', likes: 300 })

})