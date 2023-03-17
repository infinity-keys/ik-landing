import { render } from '@redwoodjs/testing/web'

import Puzzle from './Puzzle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Puzzle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Puzzle />)
    }).not.toThrow()
  })
})
