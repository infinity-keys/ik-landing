import { render } from '@redwoodjs/testing/web'

import RewardablePackPage from './RewardablePackPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('RewardablePackPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RewardablePackPage slug="slug" />)
    }).not.toThrow()
  })
})
