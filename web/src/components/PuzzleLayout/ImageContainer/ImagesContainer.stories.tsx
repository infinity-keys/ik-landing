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

import ImagesContainer from './ImagesContainer'

const meta: Meta<typeof ImagesContainer> = {
  component: ImagesContainer,
}

export default meta

type Story = StoryObj<typeof ImagesContainer>

export const Primary: Story = {}
