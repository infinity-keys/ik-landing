import { render } from '@redwoodjs/testing/web'

import StepLensApiButton from './StepLensApiButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StepLensApiButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepLensApiButton />)
    }).not.toThrow()
  })
})
