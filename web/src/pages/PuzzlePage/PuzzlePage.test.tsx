import { render } from '@redwoodjs/testing/web'

import PuzzlePage from './PuzzlePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PuzzlePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzlePage />)
    }).not.toThrow()
  })
})
