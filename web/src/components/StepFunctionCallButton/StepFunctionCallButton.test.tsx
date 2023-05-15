import { render } from '@redwoodjs/testing/web'

import StepFunctionCallButton from './StepFunctionCallButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('StepFunctionCallButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepFunctionCallButton />)
    }).not.toThrow()
  })
})
