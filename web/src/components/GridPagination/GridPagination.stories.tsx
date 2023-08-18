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

import type { Meta } from '@storybook/react'

import GridPagination from './GridPagination'

export const generated = () => {
  return <GridPagination />
}

export default {
  title: 'Components/GridPagination',
  component: GridPagination,
} as Meta<typeof GridPagination>
