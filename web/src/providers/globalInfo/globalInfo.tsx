import { createContext, useState, useContext, PropsWithChildren } from 'react'

const GlobalInfoContext = createContext<{
  pageHeading: string
  setPageHeading: (a: string) => void
} | null>(null)

export function useGlobalInfo() {
  const context = useContext(GlobalInfoContext)

  if (!context) {
    throw new Error('useGlobalInfo must be within GlobalInfoProvider')
  }

  return context
}

export const GlobalInfoProvider = ({ children }: PropsWithChildren) => {
  const [pageHeading, setPageHeading] = useState('')

  return (
    <GlobalInfoContext.Provider
      value={{
        pageHeading,
        setPageHeading,
      }}
    >
      {children}
    </GlobalInfoContext.Provider>
  )
}
