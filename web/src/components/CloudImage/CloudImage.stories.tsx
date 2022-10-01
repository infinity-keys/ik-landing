// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CloudImage> = (args) => {
//   return <CloudImage {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CloudImage from './CloudImage'

export const generated = () => {
  return <CloudImage />
}

export default {
  title: 'Components/CloudImage',
  component: CloudImage,
} as ComponentMeta<typeof CloudImage>
