import { render } from '@redwoodjs/testing/web'

import SectionContainer from './SectionContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SectionContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionContainer pageHeading="Puzzle 1" />)
    }).not.toThrow()
  })
})
