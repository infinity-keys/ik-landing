beforeEach(() => {
  cy.visit('/')
})

describe('Landing Page', () => {
  it('loads the landing page', () => {
    cy.get('[data-cy="grid-label"]').contains('Puzzles')
  })

  it('finds the first puzzle', () => {
    cy.contains('Puzzle 1 (Brazil)')
  })
})
