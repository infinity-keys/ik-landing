import { render } from '@redwoodjs/testing/web'

import ProgressDeleteButton from './ProgressDeleteButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProgressDeleteButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProgressDeleteButton />)
    }).not.toThrow()
  })
})
