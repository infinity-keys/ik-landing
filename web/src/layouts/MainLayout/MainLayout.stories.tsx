// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MainLayout> = (args) => {
//   return <MainLayout {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MainLayout from './MainLayout'

export const generated = () => {
  return <MainLayout />
}

export default {
  title: 'Components/MainLayout',
  component: MainLayout,
} as ComponentMeta<typeof MainLayout>
