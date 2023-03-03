import type { ComponentMeta } from '@storybook/react'

import RewardablePacksPage from './RewardablePacksPage'

export const generated = () => {
  return <RewardablePacksPage />
}

export default {
  title: 'Pages/RewardablePacksPage',
  component: RewardablePacksPage,
} as ComponentMeta<typeof RewardablePacksPage>
