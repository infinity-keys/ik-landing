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

import ResponsiveHeight from './ResponsiveHeight'

const meta: Meta<typeof ResponsiveHeight> = {
  component: ResponsiveHeight,
}

export default meta

type Story = StoryObj<typeof ResponsiveHeight>

export const Primary: Story = {}
