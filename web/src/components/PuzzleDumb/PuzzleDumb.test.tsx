import { render } from '@redwoodjs/testing/web'

import PuzzleDumb from './PuzzleDumb'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PuzzleDumb', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleDumb />)
    }).not.toThrow()
  })
})
