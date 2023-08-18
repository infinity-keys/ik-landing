// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GridLayoutButtons> = (args) => {
//   return <GridLayoutButtons {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta, StoryFn } from '@storybook/react'

import GridDropdownGenerated from '../GridDropdown/GridDropdown.stories'

import GridLayoutButtons from './GridLayoutButtons'

export const generated: StoryObj<typeof GridLayoutButtons> = {
  render: (args) => {
    return <GridLayoutButtons {...args} />
  },
}

export default {
  title: 'Components/GridLayoutButtons',
  component: GridLayoutButtons,
  args: {
    currentCount: GridDropdownGenerated.args?.currentCount,
    rewardableType: GridDropdownGenerated.args?.rewardableType,
  },
} as Meta<typeof GridLayoutButtons>
