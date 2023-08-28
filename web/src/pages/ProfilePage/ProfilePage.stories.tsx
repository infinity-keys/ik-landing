import type { Meta } from '@storybook/react'

import ProfilePage from './ProfilePage'

export const generated = () => {
  return <ProfilePage />
}

export default {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
} as Meta<typeof ProfilePage>
