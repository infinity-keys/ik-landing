// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof KeysLink> = (args) => {
//   return <KeysLink {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import KeysLink from './KeysLink'

export const generated = () => {
  return <KeysLink />
}

export default {
  title: 'Components/KeysLink',
  component: KeysLink,
} as ComponentMeta<typeof KeysLink>