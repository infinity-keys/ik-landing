import { render } from '@redwoodjs/testing/web'

import RewardablePage from './RewardablePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RewardablePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RewardablePage />)
    }).not.toThrow()
  })
})
