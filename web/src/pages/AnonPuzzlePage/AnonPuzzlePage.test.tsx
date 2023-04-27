import { render } from '@redwoodjs/testing/web'

import AnonPuzzlePage from './AnonPuzzlePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('AnonPuzzlePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnonPuzzlePage />)
    }).not.toThrow()
  })
})
