import { render } from '@redwoodjs/testing/web'

import WrapperLayout from './WrapperLayout'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('WrapperLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WrapperLayout />)
    }).not.toThrow()
  })
})
