import { render } from '@redwoodjs/testing/web'

import AccountCheckButton from './AccountCheckButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountCheckButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountCheckButton />)
    }).not.toThrow()
  })
})
