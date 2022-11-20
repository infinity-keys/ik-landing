// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Puzzle> = (args) => {
//   return <Puzzle {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Puzzle from './Puzzle'

export const generated = () => {
  return <Puzzle />
}

export default {
  title: 'Components/Puzzle',
  component: Puzzle,
} as ComponentMeta<typeof Puzzle>
