import { render } from '@redwoodjs/testing/web'

import DiscordHelpButton from './DiscordHelpButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DiscordHelpButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DiscordHelpButton />)
    }).not.toThrow()
  })
})
