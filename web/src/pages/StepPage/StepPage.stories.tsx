import type { ComponentMeta } from '@storybook/react'

import StepPage from './StepPage'

export const generated = () => {
  return <StepPage />
}

export default {
  title: 'Pages/StepPage',
  component: StepPage,
} as ComponentMeta<typeof StepPage>
