import { render } from '@redwoodjs/testing/web'

import EmailSubmission from './EmailSubmission'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('EmailSubmission', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailSubmission />)
    }).not.toThrow()
  })
})
