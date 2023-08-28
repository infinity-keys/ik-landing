import type { Meta } from '@storybook/react'

import AnonPuzzlePage from './AnonPuzzlePage'

export const generated = () => {
  return <AnonPuzzlePage />
}

export default {
  title: 'Pages/AnonPuzzlePage',
  component: AnonPuzzlePage,
} as Meta<typeof AnonPuzzlePage>
