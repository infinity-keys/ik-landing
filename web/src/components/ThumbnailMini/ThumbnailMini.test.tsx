import { render } from '@redwoodjs/testing/web'

import ThumbnailMini from './ThumbnailMini'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThumbnailMini', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThumbnailMini />)
    }).not.toThrow()
  })
})
