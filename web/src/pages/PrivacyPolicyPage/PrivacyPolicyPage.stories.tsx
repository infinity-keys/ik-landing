import type { Meta } from '@storybook/react'

import PrivacyPolicyPage from './PrivacyPolicyPage'

export const generated = () => {
  return <PrivacyPolicyPage />
}

export default {
  title: 'Pages/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
} as Meta<typeof PrivacyPolicyPage>
