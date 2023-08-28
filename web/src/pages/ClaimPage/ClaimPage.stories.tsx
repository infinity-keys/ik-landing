import type { Meta } from '@storybook/react'

import ClaimPage from './ClaimPage'

export const generated = () => {
  return <ClaimPage />
}

export default {
  title: 'Pages/ClaimPage',
  component: ClaimPage,
} as Meta<typeof ClaimPage>
