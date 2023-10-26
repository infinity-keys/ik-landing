import { render } from '@redwoodjs/testing/web'

import OldFormatMessage from './OldFormatMessage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OldFormatMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OldFormatMessage />)
    }).not.toThrow()
  })
})
