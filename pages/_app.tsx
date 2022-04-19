import type { AppProps } from "next/app";
import Script from "next/script";

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "../styles/scanlines.scss";
// import "../styles/stars.scss";

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)};
          ga.l=+new Date;
          ga('create', '${process.env.INFINITY_KEYS_ACCESS_CODE}', 'auto');
          ga('send','pageview');
        `}
      </Script>

      <Script
        async
        src="https://www.google-analytics.com/analytics.js"
        strategy="afterInteractive"
      ></Script>

      <Component {...pageProps} />
    </>
  );
}

export default InfinityKeysApp;
