import { render } from '@redwoodjs/testing/web'

import EmailPartner from './EmailPartner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('EmailPartner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailPartner />)
    }).not.toThrow()
  })
})
