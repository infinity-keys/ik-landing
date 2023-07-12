import type { ComponentMeta } from '@storybook/react'

import ConnectAccountsPage from './ConnectAccountsPage'

export const generated = () => {
  return <ConnectAccountsPage />
}

export default {
  title: 'Pages/ConnectAccountsPage',
  component: ConnectAccountsPage,
} as ComponentMeta<typeof ConnectAccountsPage>
