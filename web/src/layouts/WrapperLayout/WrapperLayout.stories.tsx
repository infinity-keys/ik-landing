// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NoHeaderLayout> = (args) => {
//   return <NoHeaderLayout {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import WrapperLayout from './WrapperLayout'

export const generated = () => {
  return <WrapperLayout />
}

export default {
  title: 'Components/WrapperLayout',
  component: WrapperLayout,
} as Meta<typeof WrapperLayout>
