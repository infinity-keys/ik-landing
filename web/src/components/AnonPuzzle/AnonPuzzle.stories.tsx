// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AnonPuzzle> = (args) => {
//   return <AnonPuzzle {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import AnonPuzzle from './AnonPuzzle'

export const generated = () => {
  return <AnonPuzzle />
}

export default {
  title: 'Components/AnonPuzzle',
  component: AnonPuzzle,
} as ComponentMeta<typeof AnonPuzzle>
