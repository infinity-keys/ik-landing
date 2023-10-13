import { createContext, useState, useContext, PropsWithChildren } from 'react'

import { useLocation } from '@redwoodjs/router'

import LoginModal from 'src/components/LoginModal/LoginModal'

const LoginModalContext = createContext<{
  setIsLoginModalOpen: (b: boolean) => void
} | null>(null)

export function useLoginModal() {
  const context = useContext(LoginModalContext)

  if (!context) {
    throw new Error('useLoginModal must be within LoginModalProvider')
  }

  return context
}

export const LoginModalProvider = ({ children }: PropsWithChildren) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <LoginModalContext.Provider value={{ setIsLoginModalOpen }}>
      {children}
      {isLoginModalOpen && (
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          pathname={pathname}
        />
      )}
    </LoginModalContext.Provider>
  )
}
