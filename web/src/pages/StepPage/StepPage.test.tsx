import { render } from '@redwoodjs/testing/web'

import StepPage from './StepPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('StepPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepPage />)
    }).not.toThrow()
  })
})
