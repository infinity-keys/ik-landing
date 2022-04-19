import type { AppProps } from "next/app";
// import Script from "next/script";

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "../styles/scanlines.scss";
// import "../styles/stars.scss";

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default InfinityKeysApp;
