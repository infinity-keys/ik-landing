import { render } from '@redwoodjs/testing/web'

import HomeContactForm from './HomeContactForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomeContactForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeContactForm />)
    }).not.toThrow()
  })
})
