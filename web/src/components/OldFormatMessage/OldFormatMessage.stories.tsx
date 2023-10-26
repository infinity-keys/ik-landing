// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import OldFormatMessage from './OldFormatMessage'

const meta: Meta<typeof OldFormatMessage> = {
  component: OldFormatMessage,
}

export default meta

type Story = StoryObj<typeof OldFormatMessage>

export const Primary: Story = {}
