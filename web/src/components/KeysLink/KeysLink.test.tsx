import { render } from '@redwoodjs/testing/web'

import KeysLink from './KeysLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('KeysLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KeysLink />)
    }).not.toThrow()
  })
})
