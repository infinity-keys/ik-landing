import { render } from '@redwoodjs/testing/web'

import UnderConstructionPage from './UnderConstructionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UnderConstructionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnderConstructionPage />)
    }).not.toThrow()
  })
})
