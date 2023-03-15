import '@this-dot/cypress-indexeddb'

beforeEach(() => {
  cy.clearAllCookies({ log: true })
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
  cy.clearCookies({ domain: '.magic.link' })
  cy.clearCookies({ domain: 'auth.magic.link' })
  cy.clearCookies({ domain: 'https://auth.magic.link' })
  cy.wait(2000)

  cy.clearIndexedDb('magic_auth')
  cy.wait(2000)

  cy.clearIndexedDb('MagicAuthLocalStorageDB')
  cy.wait(2000)

  cy.visit('/')
})

describe('Magic Link Flow', () => {
  // check cookie doesn't exist

  // navigate to profile page
  it('navigates to profile page', () => {
    cy.visit('/')
    cy.intercept(
      'GET',
      'https://api.magic.link/v1/core/magic_client/config'
    ).as('checkAuth')
    cy.wait('@checkAuth')

    cy.wait(2000)

    cy.get('[data-cy="profile-dropdown-parent"] > button').click()
    cy.get('[data-cy="profile-sign-in"]').click()
    cy.url().should('include', Cypress.config().baseUrl + '/profile')
  })

  it('signs in successfully', () => {
    cy.visit('/profile')

    // it hits backend when logging in
    // wait for login to finish
    // does not start signed out after signing in

    cy.get('[data-cy="magic-login-input"]')
      .click()
      .type('test+success@magic.link')
    cy.get('[data-cy="magic-login-parent"] > button').contains('Log In').click()
    cy.get('[data-cy="magic-login-parent"] > button').should(
      'contain.text',
      'Log Out'
    )
  })

  // enter email and click sign in

  // check auth cookie exists
  // cy.getCookie('your-session-cookie').should('exist')

  // check play step

  // check mint button

  // sign out
})
