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

import HomeContactForm from './HomeContactForm'

const meta: Meta<typeof HomeContactForm> = {
  component: HomeContactForm,
}

export default meta

type Story = StoryObj<typeof HomeContactForm>

export const Primary: Story = {}
