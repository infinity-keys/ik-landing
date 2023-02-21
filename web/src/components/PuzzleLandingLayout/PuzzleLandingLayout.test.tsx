import { render } from '@redwoodjs/testing/web'

import PuzzleLandingLayout from './PuzzleLandingLayout'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PuzzleLandingLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleLandingLayout />)
    }).not.toThrow()
  })
})
