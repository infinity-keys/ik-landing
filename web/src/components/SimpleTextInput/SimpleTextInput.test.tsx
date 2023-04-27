import { render } from '@redwoodjs/testing/web'

import SimpleTextInput from './SimpleTextInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('SimpleTextInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SimpleTextInput />)
    }).not.toThrow()
  })
})
