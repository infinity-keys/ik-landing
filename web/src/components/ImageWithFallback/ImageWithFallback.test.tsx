import { render } from '@redwoodjs/testing/web'

import ImageWithFallback from './ImageWithFallback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageWithFallback', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageWithFallback />)
    }).not.toThrow()
  })
})
