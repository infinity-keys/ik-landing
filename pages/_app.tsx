import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";
import "../styles/stars.scss";

function InfinityKeysApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default InfinityKeysApp;
