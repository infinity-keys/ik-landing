import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SiteLayout from './SiteLayout'

export const generated: ComponentStory<typeof SiteLayout> = (args) => {
  return <SiteLayout {...args} />
}

export default {
  title: 'Layouts/SiteLayout',
  component: SiteLayout,
} as ComponentMeta<typeof SiteLayout>
