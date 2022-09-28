import { render } from '@redwoodjs/testing/web'

import Text from './Text'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Text', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Text />)
    }).not.toThrow()
  })
})
