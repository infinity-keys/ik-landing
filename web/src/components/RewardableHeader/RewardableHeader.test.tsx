import { render } from '@redwoodjs/testing/web'

import RewardableHeader from './RewardableHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RewardableHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RewardableHeader />)
    }).not.toThrow()
  })
})
