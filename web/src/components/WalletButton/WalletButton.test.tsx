import { render } from '@redwoodjs/testing/web'

import WalletButton from './WalletButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WalletButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletButton />)
    }).not.toThrow()
  })
})
