import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const gtagURL = new URL("https://www.googletagmanager.com/gtag/js");

gtagURL.searchParams.set(
  "id",
  process.env.NEXT_PUBLIC_INFINITY_KEYS_PUBLIC_GOOGLE_ANALYTICS || ""
);

class GlobalDoc extends Document {
  render() {
    return (
      <Html lang="en" className="bg-blue">
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>

          <link
            rel="preload"
            href="/fonts/poppins-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <Script src={gtagURL.toString()} strategy="beforeInteractive" />
          <Script id="google-analytics" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_INFINITY_KEYS_PUBLIC_GOOGLE_ANALYTICS}');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default GlobalDoc;
