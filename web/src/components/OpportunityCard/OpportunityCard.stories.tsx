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

import { opportunity } from 'src/pages/HomePage/HomePage'

import OpportunityCard from './OpportunityCard'

const meta: Meta<typeof OpportunityCard> = {
  component: OpportunityCard,
}

export default meta

type Story = StoryObj<typeof OpportunityCard>

export const Primary: Story = {
  args: { ...opportunity[0] },
}
