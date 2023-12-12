import type { StoryObj, Meta } from '@storybook/react'

import RewardablePackPage from './RewardablePackPage'

export const generated: StoryObj<typeof RewardablePackPage> = {
  render: (args) => {
    return <RewardablePackPage {...args} />
  },
}

export default {
  title: 'Pages/RewardablePackPage',
  component: RewardablePackPage,
} as Meta<typeof RewardablePackPage>
