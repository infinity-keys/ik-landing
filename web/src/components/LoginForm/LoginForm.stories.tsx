import type { ComponentMeta } from '@storybook/react'

import LoginForm from './LoginForm'

export const generated = () => {
  return <LoginForm />
}

export default {
  title: 'Pages/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>
