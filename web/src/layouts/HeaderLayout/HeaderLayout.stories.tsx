import type { StoryObj, Meta, StoryFn } from '@storybook/react'

import HeaderLayout from './HeaderLayout'

export const generated: StoryObj<typeof HeaderLayout> = {
  render: (args) => {
    return <HeaderLayout {...args} />
  },
}

export default {
  title: 'Layouts/HeaderLayout',
  component: HeaderLayout,
} as Meta<typeof HeaderLayout>
