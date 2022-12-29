import type { ComponentMeta } from '@storybook/react'

import PuzzleTestPage from './PuzzleTestPage'

export const generated = () => {
  return <PuzzleTestPage />
}

export default {
  title: 'Pages/PuzzleTestPage',
  component: PuzzleTestPage,
} as ComponentMeta<typeof PuzzleTestPage>
