// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SimpleTextInput> = (args) => {
//   return <SimpleTextInput {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import SimpleTextInput from './SimpleTextInput'

export const generated: StoryObj<typeof SimpleTextInput> = {
  render: (args) => {
    return <SimpleTextInput {...args} />
  },
}

export default {
  title: 'Components/SimpleTextInput',
  component: SimpleTextInput,
} as Meta<typeof SimpleTextInput>
