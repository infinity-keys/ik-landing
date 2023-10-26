import { render } from '@redwoodjs/testing/web'

import BenefitCard from './BenefitCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BenefitCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BenefitCard />)
    }).not.toThrow()
  })
})
