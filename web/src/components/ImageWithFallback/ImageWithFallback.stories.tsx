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

import ImageWithFallback from './ImageWithFallback'

const meta: Meta<typeof ImageWithFallback> = {
  component: ImageWithFallback,
}

export default meta

type Story = StoryObj<typeof ImageWithFallback>

export const Primary: Story = {}
