import { render } from '@redwoodjs/testing/web'

import { opportunity } from 'src/pages/HomePage/HomePage'

import OpportunityCard from './OpportunityCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OpportunityCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpportunityCard {...opportunity[0]} />)
    }).not.toThrow()
  })
})
