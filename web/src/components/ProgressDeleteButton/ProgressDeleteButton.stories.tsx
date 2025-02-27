// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ProgressDeleteButton> = (args) => {
//   return <ProgressDeleteButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import ProgressDeleteButton from './ProgressDeleteButton'

export const generated: StoryObj<typeof ProgressDeleteButton> = {
  render: (args) => {
    return <ProgressDeleteButton {...args} />
  },
}

export default {
  title: 'Components/ProgressDeleteButton',
  component: ProgressDeleteButton,
} as Meta<typeof ProgressDeleteButton>
