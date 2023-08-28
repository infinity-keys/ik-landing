import type { Meta } from '@storybook/react'

import RewardablePackPage from './RewardablePackPage'

export const generated = () => {
  return <RewardablePackPage />
}

export default {
  title: 'Pages/RewardablePackPage',
  component: RewardablePackPage,
} as Meta<typeof RewardablePackPage>
