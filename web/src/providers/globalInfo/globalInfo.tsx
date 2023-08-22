import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'

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

  const contextValue = useMemo(() => {
    return {
      // Additional states will go here
      pageHeading,
      setPageHeading,
    }
  }, [pageHeading, setPageHeading])

  return (
    <GlobalInfoContext.Provider value={contextValue}>
      {children}
    </GlobalInfoContext.Provider>
  )
}
