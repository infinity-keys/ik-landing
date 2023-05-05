import { render } from '@redwoodjs/testing/web'

import Section from './Section'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Section', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Section />)
    }).not.toThrow()
  })
})
