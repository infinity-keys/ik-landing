import { render } from '@redwoodjs/testing/web'

import LensProfileFormPage from './LensProfileFormPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LensProfileFormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LensProfileFormPage />)
    }).not.toThrow()
  })
})
