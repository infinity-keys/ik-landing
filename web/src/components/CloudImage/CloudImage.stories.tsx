// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CloudImage> = (args) => {
//   return <CloudImage {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { StoryObj, Meta, StoryFn } from '@storybook/react'

import CloudImage from './CloudImage'

export const generated: StoryObj<typeof CloudImage> = {
  render: (args) => {
    return <CloudImage {...args} />
  },
}

export default {
  title: 'Components/CloudImage',
  component: CloudImage,
  args: {
    id: 'ik-alpha-trophies/starter-pack-achievment_cdbvlv',
    height: 200,
    width: 200,
    alt: 'alt text',
    circle: false,
    dpr: 23,
  },
} as Meta<typeof CloudImage>
