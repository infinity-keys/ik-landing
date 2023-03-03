// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StepsLayout> = (args) => {
//   return <StepsLayout {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StepsLayout from './StepsLayout'

export const generated = () => {
  return <StepsLayout />
}

export default {
  title: 'Components/StepsLayout',
  component: StepsLayout,
} as ComponentMeta<typeof StepsLayout>
