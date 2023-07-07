import type { ComponentMeta } from '@storybook/react'

import PuzzlePage from './PuzzlePage'

export const generated = () => {
  return <PuzzlePage />
}

export default {
  title: 'Pages/PuzzlePage',
  component: PuzzlePage,
} as ComponentMeta<typeof PuzzlePage>
