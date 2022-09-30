import type { ComponentMeta } from '@storybook/react'

import PrivacyPolicyPage from './PrivacyPolicyPage'

export const generated = () => {
  return <PrivacyPolicyPage />
}

export default {
  title: 'Pages/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
} as ComponentMeta<typeof PrivacyPolicyPage>
