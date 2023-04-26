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

import PuzzleDumb from './PuzzleDumb'

export const generated = () => {
  return <PuzzleDumb />
}

export default {
  title: 'Components/PuzzleDumb',
  component: PuzzleDumb,
} as ComponentMeta<typeof PuzzleDumb>
