import { render } from '@redwoodjs/testing/web'

import TokenIdRangeButton from './TokenIdRangeButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('TokenIdRangeButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TokenIdRangeButton />)
    }).not.toThrow()
  })
})
