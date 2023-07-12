import { render } from '@redwoodjs/testing/web'

import ConnectAccountsPage from './ConnectAccountsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe.skip('ConnectAccountsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConnectAccountsPage />)
    }).not.toThrow()
  })
})
