import type { ComponentMeta } from '@storybook/react'

import RewardablePage from './RewardablePage'

export const generated = () => {
  return <RewardablePage />
}

export default {
  title: 'Pages/RewardablePage',
  component: RewardablePage,
} as ComponentMeta<typeof RewardablePage>
