describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Wrong username or password')
      
    })
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test_user')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('Log in')
    })
  })
})