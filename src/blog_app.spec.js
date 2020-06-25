describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  it('user can log in', () => {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti')
    })
    it('login form can be opened', function() {
      cy.contains('log in').click()
    })
    /*
    it('user can login', function () {
      cy.contains('login').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
    }) 
    */


   describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    
   it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('by cypress')
    cy.get('#url').type('www.cypress.com')
    cy.contains('save').click()
    cy.contains('a blog created by cypress')
  })

  it('blog can be liked', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('by cypress')
    cy.get('#url').type('www.cypress.com')
    cy.contains('save').click()
    cy.contains('a blog created by cypress')
    cy.contains('view').click()
    cy.contains('Like').click()
  })

  it('blogs created user can remove them', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('by cypress')
    cy.get('#url').type('www.cypress.com')
    cy.contains('save').click()
    cy.contains('a blog created by cypress')
    cy.contains('view').click()
    cy.contains('REmove').click()
  })
})

  })