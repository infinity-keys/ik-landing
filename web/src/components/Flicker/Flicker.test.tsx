import { render } from '@redwoodjs/testing/web'

import Flicker from './Flicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Flicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Flicker />)
    }).not.toThrow()
  })
})
