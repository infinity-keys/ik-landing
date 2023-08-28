// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WalletButton> = (args) => {
//   return <WalletButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import WalletButton from './WalletButton'

export const generated = () => {
  return <WalletButton />
}

export default {
  title: 'Components/WalletButton',
  component: WalletButton,
} as Meta<typeof WalletButton>
