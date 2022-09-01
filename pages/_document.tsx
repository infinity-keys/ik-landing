import Document, { Html, Head, Main, NextScript } from "next/document";

class GlobalDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.INFINITY_KEYS_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.INFINITY_KEYS_PUBLIC_GOOGLE_ANALYTICS}');`,
            }}
          />

          {/* <title>Infinity Keys</title> */}
          <meta name="title" content="Infinity Keys" />
          <meta
            name="description"
            content="There's treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own.treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://infinitykeys.io/" />
          <meta property="og:title" content="Infinity Keys" />
          <meta
            property="og:description"
            content="There's treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own."
          />
          <meta
            property="og:image"
            content="https://infinitykeys.io/treasure.jpeg"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://infinitykeys.io/" />
          <meta property="twitter:title" content="Infinity Keys" />
          <meta
            property="twitter:description"
            content="There's treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own."
          />
          <meta
            property="twitter:image"
            content="https://infinitykeys.io/treasure.jpeg"
          />
          <meta name="description" content="There's treasure everywhere." />

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
