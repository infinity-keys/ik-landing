import type { ComponentMeta } from '@storybook/react'

import AuthPage from './AuthPage'

export const generated = () => {
  return <AuthPage />
}

export default {
  title: 'Pages/AuthPage',
  component: AuthPage,
} as ComponentMeta<typeof AuthPage>
