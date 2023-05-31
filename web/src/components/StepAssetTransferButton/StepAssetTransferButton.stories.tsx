// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepAssetTransferButton> = (args) => {
//   return <StepAssetTransferButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepAssetTransferButton from './StepAssetTransferButton'

export const generated = () => {
  return <StepAssetTransferButton />
}

export default {
  title: 'Components/StepAssetTransferButton',
  component: StepAssetTransferButton,
} as ComponentMeta<typeof StepAssetTransferButton>
