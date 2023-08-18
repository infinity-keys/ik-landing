// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CollapsibleMarkdown> = (args) => {
//   return <CollapsibleMarkdown {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta, StoryFn } from '@storybook/react'

import CollapsibleMarkdown from './CollapsibleMarkdown'

export const singleContentItem: StoryObj<typeof CollapsibleMarkdown> = {
  render: (args) => {
    return <CollapsibleMarkdown {...args} />
  },
}

export const collapsibleCarousel = {
  title: 'Components/CollapsibleMarkdown',
  component: CollapsibleMarkdown,
  args: {
    title: 'Collapsible Markdown Carousel',
    defaultOpen: false,
    content:
      'First item in collapsible carousel===Second item in collapsible carousel===Third item in collapsible carousel',
    alt: 'alt text',
    marginTop: true,
  },
} as Meta<typeof CollapsibleMarkdown>

export default {
  title: 'Components/CollapsibleMarkdown',
  component: CollapsibleMarkdown,
  args: {
    title: 'Collapsible Markdown',
    defaultOpen: false,
    content: 'This collapsible markdown has one element',
    alt: 'alt text',
    marginTop: true,
  },
} as Meta<typeof CollapsibleMarkdown>
