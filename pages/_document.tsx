import Document, { Html, Head, Main, NextScript } from "next/document";

import Stars from "@components/stars";

class GlobalDoc extends Document {
  render() {
    return (
      <Html>
        <Head>
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
        <body className="bg-blue text-gray-100 overflow-hidden">
          <Stars />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default GlobalDoc;
