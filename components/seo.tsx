import { IK_CLAIMS_NAMESPACE } from "@lib/constants";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

const Seo = ({
  title = "Infinity Keys",
  description = "There's treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own.",
  url = "",
  imageUrl = "treasure.jpeg",
}: Props) => {
  const formattedUrl = new URL(url, IK_CLAIMS_NAMESPACE);
  console.log("pageLink: ", formattedUrl.toString());
  const formattedImageUrl = new URL(imageUrl, IK_CLAIMS_NAMESPACE);
  console.log("imageLink: ", formattedImageUrl.toString());

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#3FCCBB" />

      {/* open graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={formattedUrl.toString()} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={formattedImageUrl.toString()} />

      {/* twitter cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={formattedUrl.toString()} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={formattedImageUrl.toString()} />
    </Head>
  );
};

export default Seo;
