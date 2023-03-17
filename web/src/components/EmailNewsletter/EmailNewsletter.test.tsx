import { render } from '@redwoodjs/testing/web'

import EmailNewsletter from './EmailNewsletter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmailNewsletter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailNewsletter />)
    }).not.toThrow()
  })
})
