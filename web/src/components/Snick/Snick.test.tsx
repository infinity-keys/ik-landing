import { render } from '@redwoodjs/testing/web'

import Snick from './Snick'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Snick', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Snick />)
    }).not.toThrow()
  })
})
