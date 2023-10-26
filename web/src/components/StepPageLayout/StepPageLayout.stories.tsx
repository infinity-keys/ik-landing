// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepPageLayout> = (args) => {
//   return <StepPageLayout {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import StepPageLayout from './StepPageLayout'

export const generated = () => {
  return <StepPageLayout />
}

export default {
  title: 'Components/StepPageLayout',
  component: StepPageLayout,
} as Meta<typeof StepPageLayout>
