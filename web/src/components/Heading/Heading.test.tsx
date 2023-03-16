import { render } from '@redwoodjs/testing/web'

import Heading from './Heading'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Heading', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Heading />)
    }).not.toThrow()
  })
})
