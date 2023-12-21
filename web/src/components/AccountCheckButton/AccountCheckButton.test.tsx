import { render } from '@redwoodjs/testing/web'

import { stepBySlug } from '../StepCell/StepCell.mock'

import AccountCheckButton from './AccountCheckButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountCheckButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountCheckButton step={stepBySlug().step} />)
    }).not.toThrow()
  })
})
