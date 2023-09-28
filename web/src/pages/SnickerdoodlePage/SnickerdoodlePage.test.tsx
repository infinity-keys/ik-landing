import { render } from '@redwoodjs/testing/web'

import SnickerdoodlePage from './SnickerdoodlePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SnickerdoodlePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SnickerdoodlePage />)
    }).not.toThrow()
  })
})
