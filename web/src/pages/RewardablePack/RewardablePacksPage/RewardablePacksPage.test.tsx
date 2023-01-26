import { render } from '@redwoodjs/testing/web'

import RewardablePacksPage from './RewardablePacksPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RewardablePacksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RewardablePacksPage />)
    }).not.toThrow()
  })
})
