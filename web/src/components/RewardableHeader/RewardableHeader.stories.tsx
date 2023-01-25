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

import type { ComponentMeta } from '@storybook/react'

import RewardableHeader from './RewardableHeader'

export const generated = () => {
  return <RewardableHeader />
}

export default {
  title: 'Components/RewardableHeader',
  component: RewardableHeader,
} as ComponentMeta<typeof RewardableHeader>
