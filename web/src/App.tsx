import { avalancheChain } from '@infinity-keys/constants'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import loMerge from 'lodash/merge'
import { Magic } from 'magic-sdk'
import { WagmiConfig } from 'wagmi'
import { chain, configureChains, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { useAuth, AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import CookieConsentBanner from 'src/components/CookieConsentBanner/CookieConsentBanner'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import 'loaders.css/loaders.min.css'
import '@rainbow-me/rainbowkit/styles.css'

export const IKTheme = loMerge(darkTheme(), {
  colors: {
    accentColor: '#3FCCBB',
    connectButtonBackground: '#354161',
    modalBackground: '#101D42',
    modalBorder: 'rgba(255,255,255,.2)',
    menuItemBackground: '#101D42',
  },
  fonts: {
    body: 'Poppins, sans-serif',
  },
  radii: {
    connectButton: '4px',
    modal: '8px',
    modalMobile: '8px',
  },
})

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, avalancheChain, chain.optimism, chain.rinkeby],
  [
    infuraProvider(),
    publicProvider(),
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Infinity Keys',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const magic = new Magic(process.env.MAGIC_LINK_PUBLIC)

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={IKTheme}>
        <FatalErrorBoundary page={FatalErrorPage}>
          <AuthProvider client={magic} type="magicLink">
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
              <RedwoodApolloProvider useAuth={useAuth}>
                <Routes />
                <CookieConsentBanner />
              </RedwoodApolloProvider>
            </RedwoodProvider>
          </AuthProvider>
        </FatalErrorBoundary>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
