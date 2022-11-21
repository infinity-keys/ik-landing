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

import type { ComponentMeta } from '@storybook/react'

import CollapsibleMarkdown from './CollapsibleMarkdown'

export const generated = () => {
  return <CollapsibleMarkdown />
}

export default {
  title: 'Components/CollapsibleMarkdown',
  component: CollapsibleMarkdown,
} as ComponentMeta<typeof CollapsibleMarkdown>
