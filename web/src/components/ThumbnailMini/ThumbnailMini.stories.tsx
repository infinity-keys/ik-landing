// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ThumbnailMini> = (args) => {
//   return <ThumbnailMini {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ThumbnailMini from './ThumbnailMini'

export const generated = () => {
  return <ThumbnailMini />
}

export default {
  title: 'Components/ThumbnailMini',
  component: ThumbnailMini,
} as ComponentMeta<typeof ThumbnailMini>
