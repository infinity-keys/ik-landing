import { render } from '@redwoodjs/testing/web'

import GridLayoutButtons from './GridLayoutButtons'
//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('GridLayoutButtons', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GridLayoutButtons
          {...{
            currentCount: 16,
            rewardableType: 'PUZZLE',
            isGrid: true,
            thumbnailCount: 16,
            setView: () => {},
          }}
        />
      )
    }).not.toThrow()
  })
})
