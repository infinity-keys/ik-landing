import { render } from '@redwoodjs/testing/web'

import LoginModal from './LoginModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginModal />)
    }).not.toThrow()
  })
})
