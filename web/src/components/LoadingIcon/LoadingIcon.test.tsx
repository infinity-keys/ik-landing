import { render } from '@redwoodjs/testing/web'

import LoadingIcon from './LoadingIcon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('LoadingIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingIcon />)
    }).not.toThrow()
  })
})
