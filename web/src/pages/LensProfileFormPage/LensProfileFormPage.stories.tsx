import type { Meta } from '@storybook/react'

import LensProfileFormPage from './LensProfileFormPage'

export const generated = () => {
  return <LensProfileFormPage />
}

export default {
  title: 'Pages/LensProfileFormPage',
  component: LensProfileFormPage,
} as Meta<typeof LensProfileFormPage>
