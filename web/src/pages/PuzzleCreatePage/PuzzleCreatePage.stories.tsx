import type { ComponentMeta } from '@storybook/react'

import PuzzleCreatePage from './PuzzleCreatePage'

export const generated = () => {
  return <PuzzleCreatePage />
}

export default {
  title: 'Pages/PuzzleCreatePage',
  component: PuzzleCreatePage,
} as ComponentMeta<typeof PuzzleCreatePage>
