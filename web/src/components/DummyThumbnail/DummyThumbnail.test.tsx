import { render } from '@redwoodjs/testing/web'

import DummyThumbnail from './DummyThumbnail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('DummyThumbnail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DummyThumbnail />)
    }).not.toThrow()
  })
})
