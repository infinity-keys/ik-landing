// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CookieConsent> = (args) => {
//   return <CookieConsent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import CookieConsentBanner from './CookieConsentBanner'

export const generated = () => {
  return <CookieConsentBanner />
}

export default {
  title: 'Components/CookieConsent',
  component: CookieConsentBanner,
} as Meta<typeof CookieConsentBanner>
