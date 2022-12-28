// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PuzzleHeader> = (args) => {
//   return <PuzzleHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PuzzleHeader from './PuzzleHeader'

export const generated = () => {
  return <PuzzleHeader />
}

export default {
  title: 'Components/PuzzleHeader',
  component: PuzzleHeader,
} as ComponentMeta<typeof PuzzleHeader>
