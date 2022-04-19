import Document, { Html, Head, Main, NextScript } from "next/document";

// import Stars from "@components/stars";

class GlobalDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
            window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)};
            ga.l=+new Date;
            ga("create", "${process.env.INFINITY_KEYS_PUBLIC_GOOGLE_ANALYTICS}", "auto");
            ga("send","pageview");
          `,
            }}
          />
          <script async src="https://www.google-analytics.com/analytics.js" />

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

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* <Stars /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default GlobalDoc;
