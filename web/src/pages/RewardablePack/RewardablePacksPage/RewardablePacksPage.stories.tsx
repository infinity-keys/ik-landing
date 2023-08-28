import type { Meta } from '@storybook/react'

import RewardablePacksPage from './RewardablePacksPage'

export const generated = () => {
  return <RewardablePacksPage />
}

export default {
  title: 'Pages/RewardablePacksPage',
  component: RewardablePacksPage,
} as Meta<typeof RewardablePacksPage>
