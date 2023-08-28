import type { StoryObj, Meta } from '@storybook/react'

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
