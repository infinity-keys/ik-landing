import { render } from '@redwoodjs/testing/web'

import AddRolesPage from './AddRolesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddRolesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddRolesPage />)
    }).not.toThrow()
  })
})
