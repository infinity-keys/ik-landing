import type { ComponentMeta, ComponentStory } from '@storybook/react'

import HeaderLayout from './HeaderLayout'

export const generated: ComponentStory<typeof HeaderLayout> = (args) => {
  return <HeaderLayout {...args} />
}

export default {
  title: 'Layouts/HeaderLayout',
  component: HeaderLayout,
} as ComponentMeta<typeof HeaderLayout>
