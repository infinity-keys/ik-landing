import { testPuzzle } from '@infinity-keys/constants'

beforeEach(() => {
  cy.visit('/')
})

describe('Landing Page', () => {
  it('loads the landing page', () => {
    cy.get('[data-cy="grid-label"]').contains('Puzzles')
  })

  it('finds the first puzzle', () => {
    cy.contains(testPuzzle.rewardable.name)
  })
})
