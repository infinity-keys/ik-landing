import type { StoryObj, Meta } from '@storybook/react'

import StepPage from './StepPage'

export const generated: StoryObj<typeof StepPage> = {
  render: (args) => {
    return <StepPage {...args} />
  },
}

export default {
  title: 'Pages/StepPage',
  component: StepPage,
  args: {
    slug: '/step',
    step: 1,
  },
} as Meta<typeof StepPage>
