import { render } from '@redwoodjs/testing/web'

import HeaderFooterLayout from './HeaderFooterLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HeaderFooterLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeaderFooterLayout />)
    }).not.toThrow()
  })
})
