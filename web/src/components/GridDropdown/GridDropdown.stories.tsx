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

import type { StoryObj, Meta, StoryFn } from '@storybook/react'

import GridDropdown from './GridDropdown'

export const generated: StoryObj<typeof GridDropdown> = {
  render: (args) => {
    return <GridDropdown {...args} />
  },
}

export default {
  title: 'Components/GridDropdown',
  component: GridDropdown,
  args: {
    currentCount: 32,
    rewardableType: 'PUZZLE',
  },
  // this line exists on the button, but it doesn't seem to work here,
  // is there a way to get an 'Action' reaction? Does is matter?
  // Will we use the `Actions` console?
  // onClick: { action: 'clicked' },
} as Meta<typeof GridDropdown>
