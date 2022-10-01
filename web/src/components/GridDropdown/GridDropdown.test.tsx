import { render } from '@redwoodjs/testing/web'

import GridDropdown from './GridDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GridDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GridDropdown />)
    }).not.toThrow()
  })
})
