import { render } from '@redwoodjs/testing/web'

import ChallengeCarousel from './ChallengeCarousel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChallengeCarousel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChallengeCarousel />)
    }).not.toThrow()
  })
})
