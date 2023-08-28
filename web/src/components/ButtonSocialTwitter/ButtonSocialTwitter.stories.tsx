// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ButtonSocialTwitter> = (args) => {
//   return <ButtonSocialTwitter {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import ButtonSocialTwitter from './ButtonSocialTwitter'

export const generated = () => {
  return <ButtonSocialTwitter />
}

export default {
  title: 'Components/ButtonSocialTwitter',
  component: ButtonSocialTwitter,
} as Meta<typeof ButtonSocialTwitter>
