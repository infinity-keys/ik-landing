import { render } from '@redwoodjs/testing/web'

import CreatorToolsTesterPage from './CreatorToolsTesterPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreatorToolsTesterPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatorToolsTesterPage />)
    }).not.toThrow()
  })
})
