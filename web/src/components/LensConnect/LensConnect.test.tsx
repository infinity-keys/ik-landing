import { render } from '@redwoodjs/testing/web'

import LensConnect from './LensConnect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('LensConnect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LensConnect text="Connect Lens" />)
    }).not.toThrow()
  })
})
