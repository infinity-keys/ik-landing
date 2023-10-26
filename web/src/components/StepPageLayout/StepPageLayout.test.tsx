import { render } from '@redwoodjs/testing/web'

import StepPageLayout from './StepPageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('StepPageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepPageLayout />)
    }).not.toThrow()
  })
})
