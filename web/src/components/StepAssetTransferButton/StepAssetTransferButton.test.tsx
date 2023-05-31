import { render } from '@redwoodjs/testing/web'

import StepAssetTransferButton from './StepAssetTransferButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StepAssetTransferButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepAssetTransferButton />)
    }).not.toThrow()
  })
})
