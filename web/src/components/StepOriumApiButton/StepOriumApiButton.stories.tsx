// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepOriumApiButton> = (args) => {
//   return <StepOriumApiButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepOriumApiButton from './StepOriumApiButton'

export const generated = () => {
  return <StepOriumApiButton />
}

export default {
  title: 'Components/StepOriumApiButton',
  component: StepOriumApiButton,
} as ComponentMeta<typeof StepOriumApiButton>
