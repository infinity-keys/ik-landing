// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Text> = (args) => {
//   return <Text {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import Text from './Text'

export const generated = () => {
  return <Text />
}

export default {
  title: 'Components/Text',
  component: Text,
} as Meta<typeof Text>
