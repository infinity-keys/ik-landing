import React, { PropsWithChildren, useEffect } from 'react'

import { ClerkProvider, useUser } from '@clerk/clerk-react'

import { createAuth } from '@redwoodjs/auth-clerk-web'
import { navigate } from '@redwoodjs/router'

export const { AuthProvider: ClerkRwAuthProvider, useAuth } = createAuth()

const ClerkStatusUpdater = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const { reauthenticate } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      reauthenticate()
    }
  }, [isSignedIn, user, reauthenticate, isLoaded])

  return null
}

type ClerkOptions = { publishableKey: string }

interface Props extends PropsWithChildren {
  clerkOptions: ClerkOptions
}

const ClerkProviderWrapper = ({ children, clerkOptions }: Props) => {
  const { reauthenticate } = useAuth()

  return (
    <ClerkProvider
      {...clerkOptions}
      navigate={(to) => reauthenticate().then(() => navigate(to))}
    >
      {children}
      <ClerkStatusUpdater />
    </ClerkProvider>
  )
}

export const AuthProvider = ({ children }: Props) => {
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error('Missing Clerk publishable key')
  }

  const clerkOptions: ClerkOptions = { publishableKey }

  return (
    <ClerkRwAuthProvider>
      <ClerkProviderWrapper clerkOptions={clerkOptions}>
        {children}
      </ClerkProviderWrapper>
    </ClerkRwAuthProvider>
  )
}
