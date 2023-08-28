// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Heading> = (args) => {
//   return <Heading {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import Heading from './Heading'

export const generated = () => {
  return <Heading />
}

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta<typeof Heading>
