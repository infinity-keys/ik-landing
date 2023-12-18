// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MarkdownCarousel> = (args) => {
//   return <MarkdownCarousel {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta } from '@storybook/react'

import MarkdownCarousel from './MarkdownCarousel'

export const generated: StoryObj<typeof MarkdownCarousel> = {
  render: (args) => {
    return <MarkdownCarousel {...args} />
  },
}

export default {
  title: 'Components/MarkdownCarousel',
  component: MarkdownCarousel,
  args: {
    showOverlay: false,
  },
} as Meta<typeof MarkdownCarousel>
