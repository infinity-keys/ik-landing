// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepErc20BalanceButton> = (args) => {
//   return <StepErc20BalanceButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepErc20BalanceButton from './StepErc20BalanceButton'

export const generated = () => {
  return <StepErc20BalanceButton />
}

export default {
  title: 'Components/StepErc20BalanceButton',
  component: StepErc20BalanceButton,
} as ComponentMeta<typeof StepErc20BalanceButton>
