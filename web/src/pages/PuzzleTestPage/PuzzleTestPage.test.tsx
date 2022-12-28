import { render } from '@redwoodjs/testing/web'

import PuzzleTestPage from './PuzzleTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PuzzleTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleTestPage />)
    }).not.toThrow()
  })
})
