import { render } from '@redwoodjs/testing/web'

import CloudImage from './CloudImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('CloudImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <CloudImage
          {...{
            id: 'ik-alpha-trophies/starter-pack-achievment_cdbvlv',
            height: 200,
            width: 200,
            alt: 'alt text',
            circle: false,
            dpr: 2,
          }}
        />
      )
    }).not.toThrow()
  })
})
