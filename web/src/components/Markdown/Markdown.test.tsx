import { render } from '@redwoodjs/testing/web'

import Markdown from './Markdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Markdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Markdown>**bold**</Markdown>)
    }).not.toThrow()
  })
})
