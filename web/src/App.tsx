import { LensConfig, production, LensProvider } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import {
  darkTheme,
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import loMerge from 'lodash/merge'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { useAuth } from 'src/auth'
import CookieConsentBanner from 'src/components/CookieConsentBanner/CookieConsentBanner'
import IK_TOKENS from 'src/lib/theme/ik-tokens.tokens.json'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import AuthProvider from 'src/providers/auth'
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
    accentColor: IK_TOKENS.brand.color['ik-gold-primary'].$value,
    modalBackground: IK_TOKENS.brand.color['ik-gray-primary'].$value,
    modalBorder: 'rgba(255,255,255,.2)',
    menuItemBackground: IK_TOKENS.brand.color['ik-gray-secondary'].$value,
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
  [chain.optimism],
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

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <WagmiConfig client={wagmiClient}>
        <LensProvider config={lensConfig}>
          <RainbowKitProvider chains={chains} theme={IKTheme}>
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
              <AuthProvider>
                <RedwoodApolloProvider useAuth={useAuth}>
                  <Routes />
                  <CookieConsentBanner />
                </RedwoodApolloProvider>
              </AuthProvider>
            </RedwoodProvider>
          </RainbowKitProvider>
        </LensProvider>
      </WagmiConfig>
    </FatalErrorBoundary>
  )
}

export default App
