import { render } from '@redwoodjs/testing/web'

import HeaderLayout from './HeaderLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('HeaderLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeaderLayout />)
    }).not.toThrow()
  })
})
