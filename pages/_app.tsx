import type { AppProps } from "next/app";
import { inspect } from '@xstate/inspect'

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "../styles/scanlines.scss";

if (typeof window !== "undefined") {
  inspect({
    iframe: false // open in new window
  });

}

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default InfinityKeysApp;
