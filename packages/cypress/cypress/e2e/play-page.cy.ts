beforeEach(() => {
  cy.visit('/play')
})

describe('Play Page', () => {
  it('visits the play page and check for puzzle', () => {
    cy.contains('Puzzle 1 (Brazil)')
  })
})
