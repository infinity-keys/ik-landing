import { render } from '@redwoodjs/testing/web'

import ConnectAccountButton from './ConnectAccountButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ConnectAccountButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConnectAccountButton provider="discord" />)
    }).not.toThrow()
  })
})
