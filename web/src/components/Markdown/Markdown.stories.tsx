// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Markdown> = (args) => {
//   return <Markdown {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import Markdown from './Markdown'

export const generated: StoryObj<typeof Markdown> = {
  render: (args) => {
    return <Markdown {...args} />
  },
}

export default {
  title: 'Components/Markdown',
  component: Markdown,
  args: {
    children: '**this is bold**',
  },
} as Meta<typeof Markdown>
