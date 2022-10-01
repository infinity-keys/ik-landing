// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Thumbnail> = (args) => {
//   return <Thumbnail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Thumbnail from './Thumbnail'

export const generated = () => {
  return <Thumbnail />
}

export default {
  title: 'Components/Thumbnail',
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>
