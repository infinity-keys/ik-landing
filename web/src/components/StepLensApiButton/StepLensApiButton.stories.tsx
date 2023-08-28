// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepLensApiButton> = (args) => {
//   return <StepLensApiButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import StepLensApiButton from './StepLensApiButton'

export const generated = () => {
  return <StepLensApiButton />
}

export default {
  title: 'Components/StepLensApiButton',
  component: StepLensApiButton,
} as Meta<typeof StepLensApiButton>
