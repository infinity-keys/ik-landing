// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GridDropdown> = (args) => {
//   return <GridDropdown {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import GridDropdown from './GridDropdown'

export const generated = () => {
  return <GridDropdown />
}

export default {
  title: 'Components/GridDropdown',
  component: GridDropdown,
} as ComponentMeta<typeof GridDropdown>
