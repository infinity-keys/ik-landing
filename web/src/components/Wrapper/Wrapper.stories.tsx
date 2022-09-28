// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Wrapper> = (args) => {
//   return <Wrapper {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Wrapper from './Wrapper'

export const generated = () => {
  return <Wrapper />
}

export default {
  title: 'Components/Wrapper',
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>
