// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RewardableHeader> = (args) => {
//   return <RewardableHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import RewardableHeader from './RewardableHeader'

export const generated: StoryObj<typeof RewardableHeader> = {
  render: (args) => {
    return <RewardableHeader {...args} />
  },
}

export default {
  title: 'Components/RewardableHeader',
  component: RewardableHeader,
  args: {
    name: 'Rewardable',
  },
} as Meta<typeof RewardableHeader>
