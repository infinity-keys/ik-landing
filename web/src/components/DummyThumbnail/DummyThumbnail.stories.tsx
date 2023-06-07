// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DummyThumbnail> = (args) => {
//   return <DummyThumbnail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import DummyThumbnail from './DummyThumbnail'

export const generated: ComponentStory<typeof DummyThumbnail> = (args) => {
  return <DummyThumbnail {...args} />
}

export default {
  title: 'Components/DummyThumbnail',
  component: DummyThumbnail,
  args: {
    text: 'This is a thumbnail!',
    name: 'Name of Thumbnail',
  },
} as ComponentMeta<typeof DummyThumbnail>
