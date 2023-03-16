// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Header> = (args) => {
//   return <Header {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Header from './Header'

export const generated = () => {
  return <Header />
}

export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>
