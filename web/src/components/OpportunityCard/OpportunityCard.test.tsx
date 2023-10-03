import { render } from '@redwoodjs/testing/web'

import OpportunityCard from './OpportunityCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OpportunityCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpportunityCard />)
    }).not.toThrow()
  })
})
