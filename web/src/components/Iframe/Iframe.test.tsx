import { render } from '@redwoodjs/testing/web'

import Iframe from './Iframe'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Iframe', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Iframe
          src="https://www.youtube.com/embed/HBYE1Aysc6I?si=lp8lGPTVmvTSCoWI"
          aspect="16/9"
        />
      )
    }).not.toThrow()
  })
})
