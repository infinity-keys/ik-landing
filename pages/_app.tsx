import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { inspect } from "@xstate/inspect";

import "@rainbow-me/rainbowkit/styles.css";
import { avalancheChain } from "@lib/walletConstants";
import { darkTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import loMerge from "lodash/merge";
import CookieConsentBanner from "@components/cookie-consent";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "../styles/fonts.css";
import "nprogress/nprogress.css";

// Custom per-path, but we'll load for all pages right now
// @TODO: make this load dynamically based on url
import "../styles/customer/p0.css";
import "../styles/customer/lens.css";

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

// Rainbow Kit Params
const IKTheme = loMerge(darkTheme(), {
  colors: {
    accentColor: "#3FCCBB",
    connectButtonBackground: "#354161",
    modalBackground: "#101D42",
    modalBorder: "rgba(255,255,255,.2)",
    menuItemBackground: "#101D42",
  },
  fonts: {
    body: "Poppins, sans-serif",
  },
  radii: {
    connectButton: "4px",
    modal: "8px",
    modalMobile: "8px",
  },
});

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, avalancheChain, chain.optimism],
  [
    infuraProvider({ apiKey: process.env.INFURA_KEY }),
    publicProvider(),
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Infinity Keys",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_IS_CYPRESS !== "true"
) {
  inspect({
    iframe: false, // open in new window
  });
}

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={IKTheme}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <CookieConsentBanner />
    </>
  );
}

export default InfinityKeysApp;
