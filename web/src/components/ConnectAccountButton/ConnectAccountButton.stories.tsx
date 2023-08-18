// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ConnectAccountButton> = (args) => {
//   return <ConnectAccountButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import ConnectAccountButton from './ConnectAccountButton'

export const generated = () => {
  return <ConnectAccountButton />
}

export default {
  title: 'Components/ConnectAccountButton',
  component: ConnectAccountButton,
} as Meta<typeof ConnectAccountButton>
