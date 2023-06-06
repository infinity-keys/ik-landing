// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Button> = (args) => {
//   return <Button {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from './Button'

// export const generated: ComponentStory<typeof Button> = (args) => {
//   return <Button {...args} />
// }

export const small: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} size="small" />
}

export const medium: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} size="medium" />
}

export const big: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} size="large" />
}

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    text: 'Click Me!',
  },
  argTypes: {
    size: { name: `size (each has a story)`, control: false },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>
