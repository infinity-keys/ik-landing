// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Alert> = (args) => {
//   return <Alert {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Alert from './Alert'

export const generated = () => {
  return <Alert />
}

export default {
  title: 'Components/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>
