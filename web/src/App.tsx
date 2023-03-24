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

// Custom per-path, but we'll load for all pages right now
// @TODO: make this load dynamically based on url
import './styles/customer/p0.css'
import './styles/customer/lens.css'
import './styles/customer/saga.css'
import './styles/customer/lens_collector.css'
import './styles/customer/spookey_gotchi.css'
import './styles/customer/raid_brood.css'
import './styles/customer/bufficorn.css'
import './styles/customer/evermore.css'

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
  [chain.mainnet, chain.polygon, avalancheChain, chain.optimism],
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
    <FatalErrorBoundary page={FatalErrorPage}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={IKTheme}>
          <AuthProvider client={magic} type="magicLink">
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
              <RedwoodApolloProvider useAuth={useAuth}>
                <Routes />
                <CookieConsentBanner />
              </RedwoodApolloProvider>
            </RedwoodProvider>
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </FatalErrorBoundary>
  )
}

export default App
