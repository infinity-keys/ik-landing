import {
  PACK_LANDING_BASE,
  PUZZLE_FAILED_BASE,
  PUZZLE_LANDING_BASE,
  PUZZLE_SUCCESS_BASE,
  welcome,
} from "./constants";

export const epochMinus30s = () => Math.round(new Date().getTime() / 1000) - 30;

// Routes
export const routeLandingUrl = (slug: string) =>
  `/${PUZZLE_LANDING_BASE}/${slug}`;
export const packsLandingUrl = (slug: string) =>
  `/${PACK_LANDING_BASE}/${slug}`;
export const routeSuccessUrl = (slug: string) =>
  `/${PUZZLE_SUCCESS_BASE}/${slug}`;
export const routeFailUrl = (slug: string) => `/${PUZZLE_FAILED_BASE}/${slug}`;

// Wallet stuff
export const message = (nonce: string) => `${welcome}\n\n${nonce}`;

// Hasura/GraphQL stuff

/**
 * Linebreaks in Hasura text fields get escaped like \\n but we need \n.
 */
export const cleanGqlMarkdown = (markdown: string) =>
  markdown.split(/\\n/).join("\n");

export const toHex = (num: number) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

// normalize pack and puzzle data for PuzzleThumbnail
export const thumbnailData = (data: any, pack: boolean) => {
  return {
    id: pack ? data.pack_id : data.puzzle_id,
    name: pack ? data.pack_name : data.simple_name,
    url: pack
      ? packsLandingUrl(data.simple_name)
      : routeLandingUrl(data.landing_route),
    cloudinary_id: data.nft?.nft_metadatum?.cloudinary_id || "",
  };
};
