import { render } from '@redwoodjs/testing/web'

import { stepBySlug } from '../StepCell/StepCell.mock'

import SimpleTextInput from './SimpleTextInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('SimpleTextInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SimpleTextInput step={stepBySlug().step} count={8} />)
    }).not.toThrow()
  })
})
