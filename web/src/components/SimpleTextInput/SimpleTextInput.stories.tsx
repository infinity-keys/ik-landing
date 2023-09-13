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

import type { Meta, StoryObj } from '@storybook/react'

import SimpleTextInput from './SimpleTextInput'

const meta: Meta<typeof SimpleTextInput> = {
  component: SimpleTextInput,
}

export default meta

type Story = StoryObj<typeof SimpleTextInput>

export const WithCount: Story = {
  args: {
    count: 8,
    step: { id: 'string' },
  },
}
