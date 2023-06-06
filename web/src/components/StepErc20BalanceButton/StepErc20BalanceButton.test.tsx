import { render } from '@redwoodjs/testing/web'

import StepErc20BalanceButton from './StepErc20BalanceButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StepErc20BalanceButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepErc20BalanceButton />)
    }).not.toThrow()
  })
})
