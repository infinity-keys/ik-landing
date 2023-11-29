import { render } from '@redwoodjs/testing/web'

import Thumbnail from './Thumbnail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('Thumbnail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Thumbnail
          {...{
            id: '1',
            name: 'name',
            href: '/',
            isGrid: false,
          }}
        />
      )
    }).not.toThrow()
  })
})
