import { render } from '@redwoodjs/testing/web'

import DiscordAuthButton from './DiscordAuthButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DiscordAuthButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DiscordAuthButton />)
    }).not.toThrow()
  })
})
