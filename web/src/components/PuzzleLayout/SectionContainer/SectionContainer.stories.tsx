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

import SectionContainer from './SectionContainer'

const meta: Meta<typeof SectionContainer> = {
  component: SectionContainer,
}

export default meta

type Story = StoryObj<typeof SectionContainer>

export const Primary: Story = {}
