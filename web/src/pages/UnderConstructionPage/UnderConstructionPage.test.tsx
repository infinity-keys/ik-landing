import { render } from '@redwoodjs/testing/web'

import UnderConstructionPage from './UnderConstructionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('UnderConstructionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnderConstructionPage />)
    }).not.toThrow()
  })
})
