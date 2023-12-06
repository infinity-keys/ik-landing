import { render } from '@redwoodjs/testing/web'

import MarkdownCarousel from './MarkdownCarousel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MarkdownCarousel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <MarkdownCarousel
          {...{
            setShowOverlay: () => {},
            setSlideIndex: () => {},
            showOverlay: false,
          }}
        />
      )
    }).not.toThrow()
  })
})
