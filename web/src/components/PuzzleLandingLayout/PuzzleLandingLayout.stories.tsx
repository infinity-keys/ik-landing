// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PuzzleLandingLayout> = (args) => {
//   return <PuzzleLandingLayout {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import PuzzleLandingLayout from './PuzzleLandingLayout'

export const generated = () => {
  return <PuzzleLandingLayout />
}

export default {
  title: 'Components/PuzzleLandingLayout',
  component: PuzzleLandingLayout,
} as Meta<typeof PuzzleLandingLayout>
