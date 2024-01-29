import { render } from '@redwoodjs/testing/web'

import CreatePuzzleFormPage from './CreatePuzzleFormPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('CreatePuzzleFormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePuzzleFormPage />)
    }).not.toThrow()
  })
})
