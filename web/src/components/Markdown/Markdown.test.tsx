import { render } from '@redwoodjs/testing/web'

import Markdown from './Markdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Markdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Markdown />)
    }).not.toThrow()
  })
})
