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

import { benefits } from 'src/pages/HomePage/HomePage'

import BenefitCard from './BenefitCard'

const meta: Meta<typeof BenefitCard> = {
  component: BenefitCard,
}

export default meta

type Story = StoryObj<typeof BenefitCard>

export const Primary: Story = {
  args: { ...benefits[0] },
}
