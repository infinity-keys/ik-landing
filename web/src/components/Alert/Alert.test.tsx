import { render } from '@redwoodjs/testing/web'

import Alert from './Alert'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Alert', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Alert />)
    }).not.toThrow()
  })
})
