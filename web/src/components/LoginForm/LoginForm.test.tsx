import { render } from '@redwoodjs/testing/web'

import LoginForm from './LoginForm'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginForm />)
    }).not.toThrow()
  })
})
