import { render } from '@redwoodjs/testing/web'

import CookieConsentBanner from './CookieConsentBanner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('CookieConsentBanner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CookieConsentBanner />)
    }).not.toThrow()
  })
})
