import { render } from '@redwoodjs/testing/web'

import Iframe from './Iframe'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Iframe', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Iframe />)
    }).not.toThrow()
  })
})
