import { render } from '@redwoodjs/testing/web'

import GridDropdown from './GridDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('GridDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GridDropdown currentCount={16} rewardableType="PUZZLE" />)
    }).not.toThrow()
  })
})
