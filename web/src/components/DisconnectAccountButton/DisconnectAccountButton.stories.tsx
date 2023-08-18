// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DisconnectAccountButton> = (args) => {
//   return <DisconnectAccountButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import DisconnectAccountButton from './DisconnectAccountButton'

export const generated = () => {
  return <DisconnectAccountButton />
}

export default {
  title: 'Components/DisconnectAccountButton',
  component: DisconnectAccountButton,
} as Meta<typeof DisconnectAccountButton>
