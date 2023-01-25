import type { ComponentMeta } from '@storybook/react'

import RewardablePackPage from './RewardablePackPage'

export const generated = () => {
  return <RewardablePackPage />
}

export default {
  title: 'Pages/RewardablePackPage',
  component: RewardablePackPage,
} as ComponentMeta<typeof RewardablePackPage>
