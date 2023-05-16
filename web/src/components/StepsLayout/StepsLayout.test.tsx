import { render } from '@redwoodjs/testing/web'

import StepsLayout from './StepsLayout'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('StepsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StepsLayout />)
    }).not.toThrow()
  })
})
