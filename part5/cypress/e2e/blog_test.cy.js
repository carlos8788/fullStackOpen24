describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test2',
      name: 'user2',
      password: '123456'
    })

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Wrong username or password')

    })
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test_user')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Log in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test_user')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Log in')
    })

    it('A blog can be created', function () {
      cy.get('#newBlog').click()
      cy.get('#title').type('title_test')
      cy.get('#author').type('author_test')
      cy.get('#url').type('url_test')
      cy.get('#submit').click()
    })
  })


})

describe('Login other user', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  })

  it('view the blg and add like', function () {

    cy.get('input[name=username]').type('test2');
    cy.get('input[name=password]').type('123456');
    cy.get('#loginBtn').click()

    cy.contains('user2 Log in');


    cy.get('#view').click()
    cy.get('.likeBtn').click()
    cy.get('.likes').contains('1')


  });

  describe('Login', function () {

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Wrong username or password')

    })
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test_user')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Log in')
    })
  })
  describe('When logged delete blog', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test_user')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Log in')

    })

    it('A blog can be created', function () {
      cy.get('#view').click()
      cy.get('.danger').click()
      
      
      
      
    })
  })
  describe('Create blogs and order DESC', function () {
    beforeEach(function () {
      
      cy.visit('http://localhost:5173');
      cy.get('#username').type('test_user');
      cy.get('#password').type('123456');
      cy.get('#loginBtn').click();
      
      let authToken;
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test_user',
        password: '123456',
      }).then((response) => {
        
        console.log(response, 'responseRESPONSE');
        authToken = response.body.token;
        
        const blogs = [
          { title: 'title1', author: 'author1', url: 'url1', likes: 1 },
          { title: 'title2', author: 'author2', url: 'url2', likes: 2 },
          { title: 'title3', author: 'author3', url: 'url3', likes: 3 }
        ];

        blogs.forEach(blog => {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs',
            headers: {
              'Authorization': `Bearer ${authToken}`
            },
            body: blog
          });
        });
      });
      cy.visit('http://localhost:5173');
      
    });

    it('blogs are created and ordered by likes DESC', function () {
      
      
    });
  });

})
