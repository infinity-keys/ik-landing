// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GridPagination> = (args) => {
//   return <GridPagination {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import GridPagination from './GridPagination'

export const generated: StoryObj<typeof GridPagination> = {
  render: (args) => {
    return <GridPagination {...args} />
  },
}

export default {
  title: 'Components/GridPagination',
  component: GridPagination,
  args: {
    isFirstPage: true,
    isLastPage: false,
    pageNum: 1,
    rewardableType: 'PUZZLE',
    thumbnailCount: 16,
  },
} as Meta<typeof GridPagination>
