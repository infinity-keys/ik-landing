import type { ComponentMeta } from '@storybook/react'

import UserPage from './UserPage'

export const generated = () => {
  return <UserPage />
}

export default {
  title: 'Pages/UserPage',
  component: UserPage,
} as ComponentMeta<typeof UserPage>
