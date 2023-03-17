// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Iframe> = (args) => {
//   return <Iframe {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Iframe from './Iframe'

export const generated = () => {
  return <Iframe />
}

export default {
  title: 'Components/Iframe',
  component: Iframe,
} as ComponentMeta<typeof Iframe>
