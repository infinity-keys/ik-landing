import { render } from '@redwoodjs/testing/web'

import PrivacyPolicyPage from './PrivacyPolicyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PrivacyPolicyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivacyPolicyPage />)
    }).not.toThrow()
  })
})
