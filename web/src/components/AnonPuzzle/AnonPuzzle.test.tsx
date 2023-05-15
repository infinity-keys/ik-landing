import { render } from '@redwoodjs/testing/web'

import AnonPuzzle from './AnonPuzzle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('AnonPuzzle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnonPuzzle />)
    }).not.toThrow()
  })
})
