import { render } from '@redwoodjs/testing/web'

import { benefits } from 'src/pages/HomePage/HomePage'

import BenefitCard from './BenefitCard'
//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BenefitCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BenefitCard {...benefits[0]} />)
    }).not.toThrow()
  })
})
