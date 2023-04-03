// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepComethApiButton> = (args) => {
//   return <StepComethApiButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepComethApiButton from './StepComethApiButton'

export const generated = () => {
  return <StepComethApiButton />
}

export default {
  title: 'Components/StepComethApiButton',
  component: StepComethApiButton,
} as ComponentMeta<typeof StepComethApiButton>
