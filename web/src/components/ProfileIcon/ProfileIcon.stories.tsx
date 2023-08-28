// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ProfileIcon> = (args) => {
//   return <ProfileIcon {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import ProfileIcon from './ProfileIcon'

export const generated = () => {
  return <ProfileIcon />
}

export default {
  title: 'Components/ProfileIcon',
  component: ProfileIcon,
} as Meta<typeof ProfileIcon>
