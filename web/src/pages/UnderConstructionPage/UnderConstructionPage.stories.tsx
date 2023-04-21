import type { ComponentMeta } from '@storybook/react'

import UnderConstructionPage from './UnderConstructionPage'

export const generated = () => {
  return <UnderConstructionPage />
}

export default {
  title: 'Pages/UnderConstructionPage',
  component: UnderConstructionPage,
} as ComponentMeta<typeof UnderConstructionPage>
