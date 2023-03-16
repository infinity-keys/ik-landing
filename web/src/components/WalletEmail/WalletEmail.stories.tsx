// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WalletEmail> = (args) => {
//   return <WalletEmail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import WalletEmail from './WalletEmail'

export const generated = () => {
  return <WalletEmail />
}

export default {
  title: 'Components/WalletEmail',
  component: WalletEmail,
} as ComponentMeta<typeof WalletEmail>
