import type { Meta } from '@storybook/react'

import HomePage from './HomePage'

export const generated = () => {
  return <HomePage />
}

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as Meta<typeof HomePage>
