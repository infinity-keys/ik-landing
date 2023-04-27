import { render } from '@redwoodjs/testing/web'

import CollapsibleMarkdown from './CollapsibleMarkdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('CollapsibleMarkdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CollapsibleMarkdown />)
    }).not.toThrow()
  })
})
