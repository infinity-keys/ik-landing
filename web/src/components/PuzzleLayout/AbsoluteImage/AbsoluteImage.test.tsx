import { render } from '@redwoodjs/testing/web'

import AbsoluteImage from './AbsoluteImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AbsoluteImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AbsoluteImage />)
    }).not.toThrow()
  })
})
