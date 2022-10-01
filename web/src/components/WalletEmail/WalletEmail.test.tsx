import { render } from '@redwoodjs/testing/web'

import WalletEmail from './WalletEmail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WalletEmail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletEmail />)
    }).not.toThrow()
  })
})
