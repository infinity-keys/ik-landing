import { render } from '@redwoodjs/testing/web'

import GridPagination from './GridPagination'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('GridPagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GridPagination
          {...{
            isFirstPage: true,
            isLastPage: false,
            pageNum: 1,
            rewardableType: 'PUZZLE',
            thumbnailCount: 16,
          }}
        />
      )
    }).not.toThrow()
  })
})
