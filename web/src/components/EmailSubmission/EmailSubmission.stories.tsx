// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EmailSubmission> = (args) => {
//   return <EmailSubmission {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import EmailSubmission from './EmailSubmission'

export const generated = () => {
  return <EmailSubmission />
}

export default {
  title: 'Components/EmailSubmission',
  component: EmailSubmission,
} as Meta<typeof EmailSubmission>
