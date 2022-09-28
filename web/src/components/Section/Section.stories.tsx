// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Section> = (args) => {
//   return <Section {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Section from './Section'

export const generated = () => {
  return <Section />
}

export default {
  title: 'Components/Section',
  component: Section,
} as ComponentMeta<typeof Section>
