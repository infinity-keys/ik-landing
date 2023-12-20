import { render } from '@redwoodjs/testing/web'

import ImagesContainer from './ImagesContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImagesContainer />)
    }).not.toThrow()
  })
})
