// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoginModal> = (args) => {
//   return <LoginModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoginModal from './LoginModal'

export const generated = () => {
  return <LoginModal />
}

export default {
  title: 'Components/LoginModal',
  component: LoginModal,
} as ComponentMeta<typeof LoginModal>
