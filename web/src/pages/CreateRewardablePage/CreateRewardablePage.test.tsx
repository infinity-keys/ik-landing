import { render } from '@redwoodjs/testing/web'

import CreateRewardablePage from './CreateRewardablePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('CreateRewardablePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateRewardablePage />)
    }).not.toThrow()
  })
})
