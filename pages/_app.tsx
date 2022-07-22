import type { AppProps } from "next/app";
import { inspect } from "@xstate/inspect";

const { NODE_ENV } = process.env;

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import Header from "@components/header";
import Footer from "@components/footer";

if (typeof window !== "undefined" && NODE_ENV === "development") {
  inspect({
    iframe: false, // open in new window
  });
}

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default InfinityKeysApp;
