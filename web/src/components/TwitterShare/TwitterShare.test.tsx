import { render } from '@redwoodjs/testing/web'

import TwitterShare from './TwitterShare'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('TwitterShare', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TwitterShare />)
    }).not.toThrow()
  })
})
