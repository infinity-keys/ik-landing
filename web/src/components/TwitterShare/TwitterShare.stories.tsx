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

import type { ComponentMeta } from '@storybook/react'

import TwitterShare from './TwitterShare'

export const generated = () => {
  return <TwitterShare />
}

export default {
  title: 'Components/TwitterShare',
  component: TwitterShare,
} as ComponentMeta<typeof TwitterShare>
