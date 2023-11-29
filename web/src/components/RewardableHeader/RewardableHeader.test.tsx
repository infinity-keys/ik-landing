import { render } from '@redwoodjs/testing/web'

import RewardableHeader from './RewardableHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('RewardableHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RewardableHeader name="Rewardable" />)
    }).not.toThrow()
  })
})
