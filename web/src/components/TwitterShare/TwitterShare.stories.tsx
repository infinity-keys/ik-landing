// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof TwitterShare> = (args) => {
//   return <TwitterShare {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import TwitterShare from './TwitterShare'

export const generated: StoryObj<typeof TwitterShare> = {
  render: (args) => {
    return <TwitterShare {...args} />
  },
}

export default {
  title: 'Components/TwitterShare',
  component: TwitterShare,
  args: {
    tweetBody: 'tweet',
  },
} as Meta<typeof TwitterShare>
