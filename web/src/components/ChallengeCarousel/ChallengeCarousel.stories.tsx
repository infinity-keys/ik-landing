// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChallengeCarousel> = (args) => {
//   return <ChallengeCarousel {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChallengeCarousel from './ChallengeCarousel'

export const generated = () => {
  return <ChallengeCarousel />
}

export default {
  title: 'Components/ChallengeCarousel',
  component: ChallengeCarousel,
} as ComponentMeta<typeof ChallengeCarousel>
