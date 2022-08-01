import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { inspect } from "@xstate/inspect";

const { NODE_ENV } = process.env;

// Re-enable here and below for auth via auth0
// import { UserProvider } from "@auth0/nextjs-auth0";

import "loaders.css/loaders.min.css";
import "../styles/globals.css";
import "nprogress/nprogress.css";

if (typeof window !== "undefined" && NODE_ENV === "development") {
  inspect({
    iframe: false, // open in new window
  });
}

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default InfinityKeysApp;
