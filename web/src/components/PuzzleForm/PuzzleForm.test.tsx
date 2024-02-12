import { render } from '@redwoodjs/testing/web'

import PuzzleForm from './PuzzleForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('PuzzleForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PuzzleForm />)
    }).not.toThrow()
  })
})
