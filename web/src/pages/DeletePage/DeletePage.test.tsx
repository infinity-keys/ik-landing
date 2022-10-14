import { render } from '@redwoodjs/testing/web'

import DeletePage from './DeletePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DeletePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeletePage />)
    }).not.toThrow()
  })
})
