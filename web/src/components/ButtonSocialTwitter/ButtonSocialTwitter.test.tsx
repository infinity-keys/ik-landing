import { render } from '@redwoodjs/testing/web'

import ButtonSocialTwitter from './ButtonSocialTwitter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ButtonSocialTwitter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ButtonSocialTwitter />)
    }).not.toThrow()
  })
})
