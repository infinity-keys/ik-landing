import { PropsWithChildren } from 'react'

import { OAuthProvider } from 'src/providers/oAuth'
import { RedirectionProvider } from 'src/providers/redirection'

const AllContextProviders = ({ children }: PropsWithChildren) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <OAuthProvider>
      <RedirectionProvider>{children}</RedirectionProvider>
    </OAuthProvider>
  )
}

export default AllContextProviders
