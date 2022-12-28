import { render } from '@redwoodjs/testing/web'

import PuzzleHeader from './PuzzleHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PuzzleHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleHeader />)
    }).not.toThrow()
  })
})
