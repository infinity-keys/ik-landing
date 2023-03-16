import { render } from '@redwoodjs/testing/web'

import Wrapper from './Wrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Wrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Wrapper />)
    }).not.toThrow()
  })
})
