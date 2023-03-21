import type { ComponentMeta } from '@storybook/react'

import PlayPage from './PlayPage'

export const generated = () => {
  return <PlayPage />
}

export default {
  title: 'Pages/PlayPage',
  component: PlayPage,
} as ComponentMeta<typeof PlayPage>