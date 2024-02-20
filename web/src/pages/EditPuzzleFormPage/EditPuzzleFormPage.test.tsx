import { render } from '@redwoodjs/testing/web'

import EditPuzzleFormPage from './EditPuzzleFormPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('EditPuzzleFormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditPuzzleFormPage />)
    }).not.toThrow()
  })
})
