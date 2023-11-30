import { render } from '@redwoodjs/testing/web'

import DisconnectAccountButton from './DisconnectAccountButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DisconnectAccountButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DisconnectAccountButton provider="discord" />)
    }).not.toThrow()
  })
})
