import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { inspect } from "@xstate/inspect";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, IKTheme, wagmiClient } from "@lib/walletConstants";

const { NODE_ENV } = process.env;

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "nprogress/nprogress.css";

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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={IKTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default InfinityKeysApp;
