import { render } from '@redwoodjs/testing/web'

import FormArchetypePage from './FormArchetypePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FormArchetypePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormArchetypePage />)
    }).not.toThrow()
  })
})
