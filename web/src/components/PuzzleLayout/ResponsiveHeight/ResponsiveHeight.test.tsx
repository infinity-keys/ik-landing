import { render } from '@redwoodjs/testing/web'

import ResponsiveHeight from './ResponsiveHeight'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ResponsiveHeight', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResponsiveHeight />)
    }).not.toThrow()
  })
})
