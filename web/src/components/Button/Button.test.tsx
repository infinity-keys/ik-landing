import { render } from '@redwoodjs/testing/web'

import Button from './Button'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Button', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Button />)
    }).not.toThrow()
  })
})
