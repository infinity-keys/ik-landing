import type { ComponentMeta } from '@storybook/react'

import CreateRewardablePage from './CreateRewardablePage'

export const generated = () => {
  return <CreateRewardablePage />
}

export default {
  title: 'Pages/CreateRewardablePage',
  component: CreateRewardablePage,
} as ComponentMeta<typeof CreateRewardablePage>
