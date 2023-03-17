import { render } from '@redwoodjs/testing/web'

import ProfileIcon from './ProfileIcon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileIcon />)
    }).not.toThrow()
  })
})
