// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import AbsoluteImage from './AbsoluteImage'

const meta: Meta<typeof AbsoluteImage> = {
  component: AbsoluteImage,
}

export default meta

type Story = StoryObj<typeof AbsoluteImage>

export const Primary: Story = {}
