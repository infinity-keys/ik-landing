import { render } from '@redwoodjs/testing/web'

import StepOriumApiButton from './StepOriumApiButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StepOriumApiButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepOriumApiButton />)
    }).not.toThrow()
  })
})
