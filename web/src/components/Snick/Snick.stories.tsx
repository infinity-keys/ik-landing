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

import Snick from './Snick'

const meta: Meta<typeof Snick> = {
  component: Snick,
}

export default meta

type Story = StoryObj<typeof Snick>

export const Primary: Story = {}
