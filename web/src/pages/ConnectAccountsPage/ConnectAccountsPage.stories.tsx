import type { Meta } from '@storybook/react'

import ConnectAccountsPage from './ConnectAccountsPage'

export const generated = () => {
  return <ConnectAccountsPage />
}

export default {
  title: 'Pages/ConnectAccountsPage',
  component: ConnectAccountsPage,
} as Meta<typeof ConnectAccountsPage>
