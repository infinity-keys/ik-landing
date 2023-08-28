// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AccountCheckButton> = (args) => {
//   return <AccountCheckButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import AccountCheckButton from './AccountCheckButton'

export const generated = () => {
  return <AccountCheckButton />
}

export default {
  title: 'Components/AccountCheckButton',
  component: AccountCheckButton,
} as Meta<typeof AccountCheckButton>
