// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NftCheckButton> = (args) => {
//   return <NftCheckButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NftCheckButton from './NftCheckButton'

export const generated = () => {
  return <NftCheckButton />
}

export default {
  title: 'Components/NftCheckButton',
  component: NftCheckButton,
} as ComponentMeta<typeof NftCheckButton>
