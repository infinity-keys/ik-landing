beforeEach(() => {
  cy.visit('/packs').wait(1000)
})

describe('Accepts Cookies', () => {
  it('accepts cookies and hides the prompt afterwards', () => {
    // find the accept cookies button inside the prompt
    cy.get('#rcc-confirm-button').should('be.visible').click().wait(1000)

    // after clicking on it, the prompt should disappear
    cy.get('.backdrop-blur-md').should('not.exist')
  })
})

describe('First Puzzle', () => {
  it('finds the first of our puzzles', () => {
    cy.contains('Novice').wait(1000)
  })

  it('shows the list buttons when rendered', () => {
    // when you click this button...
    cy.get('button[aria-label="set list view"]').click()

    // ...you should have this in the DOM:
    cy.get('button[aria-label="set list view"]').should('be.visible')
    cy.get('.puzzle-thumb')
      .should('be.visible')
      .find('[class*="lg:px-6"]')
      .wait(1000)
  })

  it('shows grid buttons when rendered', () => {
    // when you click this button...
    cy.get('button[aria-label="set grid view"]').click()

    // ...you should have this in the DOM:
    cy.get('button[aria-label="set grid view"]').should('be.visible')
    cy.get('.puzzle-thumb')
      .should('be.visible')
      .find('.flex-col.p-8')
      .wait(1000)
  })
})
