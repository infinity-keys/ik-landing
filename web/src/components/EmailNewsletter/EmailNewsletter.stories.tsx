// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EmailNewsletter> = (args) => {
//   return <EmailNewsletter {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import EmailNewsletter from './EmailNewsletter'

export const generated = () => {
  return <EmailNewsletter />
}

export default {
  title: 'Components/EmailNewsletter',
  component: EmailNewsletter,
} as Meta<typeof EmailNewsletter>
