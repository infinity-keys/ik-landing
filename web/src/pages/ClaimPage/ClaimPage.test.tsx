import { render } from '@redwoodjs/testing/web'

import ClaimPage from './ClaimPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClaimPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClaimPage />)
    }).not.toThrow()
  })
})
