import { render } from '@redwoodjs/testing/web'

import PuzzleCreatePage from './PuzzleCreatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PuzzleCreatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleCreatePage />)
    }).not.toThrow()
  })
})
