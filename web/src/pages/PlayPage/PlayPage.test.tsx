import { render } from '@redwoodjs/testing/web'

import PlayPage from './PlayPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlayPage />)
    }).not.toThrow()
  })
})
