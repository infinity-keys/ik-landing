import type { ComponentMeta } from '@storybook/react'

import CreatePuzzleFormPage from './CreatePuzzleFormPage'

export const generated = () => {
  return <CreatePuzzleFormPage />
}

export default {
  title: 'Pages/CreatePuzzleFormPage',
  component: CreatePuzzleFormPage,
} as ComponentMeta<typeof CreatePuzzleFormPage>
