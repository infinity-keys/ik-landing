import { render } from '@redwoodjs/testing/web'

import { stepBySlug } from '../StepCell/StepCell.mock'

import StepsLayout from './StepsLayout'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('StepsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepsLayout step={stepBySlug().step} />)
    }).not.toThrow()
  })
})
