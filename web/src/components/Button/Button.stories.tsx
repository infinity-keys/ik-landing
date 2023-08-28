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

import type { StoryObj, Meta } from '@storybook/react'

import Button from './Button'

export const small: StoryObj<typeof Button> = {
  render: (args) => {
    return <Button {...args} size="small" />
  },
}

export const medium: StoryObj<typeof Button> = {
  render: (args) => {
    return <Button {...args} size="medium" />
  },
}

export const big: StoryObj<typeof Button> = {
  render: (args) => {
    return <Button {...args} size="large" />
  },
}

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    text: 'Click Me!',
  },
  argTypes: {
    size: {
      name: `sizes: seprate stories`,
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>
