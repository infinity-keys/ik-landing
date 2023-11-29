// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Flicker> = (args) => {
//   return <Flicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import Flicker from './Flicker'

export const generated: StoryObj<typeof Flicker> = {
  render: (args) => {
    return <Flicker {...args} />
  },
}

export default {
  title: 'Components/Flicker',
  component: Flicker,
  args: {
    children: 'Flicker',
  },
} as Meta<typeof Flicker>
