import type { ComponentMeta, ComponentStory } from '@storybook/react'

import HeaderFooterLayout from './HeaderFooterLayout'

export const generated: ComponentStory<typeof HeaderFooterLayout> = (args) => {
  return <HeaderFooterLayout {...args} />
}

export default {
  title: 'Layouts/HeaderFooterLayout',
  component: HeaderFooterLayout,
} as ComponentMeta<typeof HeaderFooterLayout>
