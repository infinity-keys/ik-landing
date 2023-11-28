// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LensConnect> = (args) => {
//   return <LensConnect {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import LensConnect from './LensConnect'

export const generated: StoryObj<typeof LensConnect> = {
  render: (args) => {
    return <LensConnect {...args} />
  },
}

export default {
  title: 'Components/LensConnect',
  component: LensConnect,
  args: {
    text: 'Connect',
  },
} as Meta<typeof LensConnect>
