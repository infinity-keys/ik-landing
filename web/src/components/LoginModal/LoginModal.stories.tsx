import type { Meta } from '@storybook/react'

import LoginModal from './LoginModal'

export const generated = () => {
  return <LoginModal />
}

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as Meta<typeof LoginPage>
