import { PropsWithChildren } from 'react'

import { GlobalInfoProvider } from 'src/providers/globalInfo/globalInfo'
import { LoginModalProvider } from 'src/providers/loginModal/loginModal'
import { OAuthProvider } from 'src/providers/oAuth'
import { RedirectionProvider } from 'src/providers/redirection'

const AllContextProviders = ({ children }: PropsWithChildren) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <OAuthProvider>
      <RedirectionProvider>
        <GlobalInfoProvider>
          <LoginModalProvider>{children}</LoginModalProvider>
        </GlobalInfoProvider>
      </RedirectionProvider>
    </OAuthProvider>
  )
}

export default AllContextProviders
