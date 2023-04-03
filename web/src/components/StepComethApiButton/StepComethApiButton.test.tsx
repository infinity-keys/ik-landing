import { render } from '@redwoodjs/testing/web'

import StepComethApiButton from './StepComethApiButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StepComethApiButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepComethApiButton />)
    }).not.toThrow()
  })
})
