import { render } from '@redwoodjs/testing/web'

import GridLayoutButtons from './GridLayoutButtons'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GridLayoutButtons', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GridLayoutButtons />)
    }).not.toThrow()
  })
})
