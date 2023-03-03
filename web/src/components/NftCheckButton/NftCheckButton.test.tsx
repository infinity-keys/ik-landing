import { render } from '@redwoodjs/testing/web'

import NftCheckButton from './NftCheckButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NftCheckButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NftCheckButton />)
    }).not.toThrow()
  })
})
