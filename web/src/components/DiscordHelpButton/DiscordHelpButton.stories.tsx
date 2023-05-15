// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DiscordHelpButton> = (args) => {
//   return <DiscordHelpButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import DiscordHelpButton from './DiscordHelpButton'

export const generated = () => {
  return <DiscordHelpButton />
}

export default {
  title: 'Components/DiscordHelpButton',
  component: DiscordHelpButton,
} as ComponentMeta<typeof DiscordHelpButton>
