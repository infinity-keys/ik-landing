import type { AppProps } from "next/app";

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "../styles/scanlines.scss";
import "../styles/stars.scss";

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    // <UserProvider>
    <Component {...pageProps} />
    // </UserProvider>
  );
}

export default InfinityKeysApp;
