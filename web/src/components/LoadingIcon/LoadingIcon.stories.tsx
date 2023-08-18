// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoadingIcon> = (args) => {
//   return <LoadingIcon {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import LoadingIcon from './LoadingIcon'

export const generated = () => {
  return <LoadingIcon />
}

export default {
  title: 'Components/LoadingIcon',
  component: LoadingIcon,
} as Meta<typeof LoadingIcon>
