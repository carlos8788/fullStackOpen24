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

  it('visits the app and logs in', function () {

    cy.get('input[name=username]').type('test2');
    cy.get('input[name=password]').type('123456');
    cy.get('#loginBtn').click()

    cy.contains('user2 Log in');


    cy.get('#view').click()
    cy.get('.likeBtn').click()
    cy.get('.likes').contains('1')


  });

});