import type { Meta } from '@storybook/react'

import LoginPage from './LoginModal'

export const generated = () => {
  return <LoginPage />
}

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as Meta<typeof LoginPage>
