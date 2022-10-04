import { render } from '@redwoodjs/testing/web'

import UserPage from './UserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPage />)
    }).not.toThrow()
  })
})
