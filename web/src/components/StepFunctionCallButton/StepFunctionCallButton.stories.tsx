// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepFunctionCallButton> = (args) => {
//   return <StepFunctionCallButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepFunctionCallButton from './StepFunctionCallButton'

export const generated = () => {
  return <StepFunctionCallButton />
}

export default {
  title: 'Components/StepFunctionCallButton',
  component: StepFunctionCallButton,
} as ComponentMeta<typeof StepFunctionCallButton>
