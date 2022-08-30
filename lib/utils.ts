import { z } from "zod";
import {
  IK_CLAIMS_NAMESPACE,
  PACK_COLLECTION_BASE,
  PACK_LANDING_BASE,
  PUZZLE_COLLECTION_BASE,
  PUZZLE_FAILED_BASE,
  PUZZLE_LANDING_BASE,
  PUZZLE_SUCCESS_BASE,
  URL_ORIGIN,
  welcome,
} from "@lib/constants";
import { ikApiUrlBase } from "@lib/fetchers";
import { makeUserToken } from "@lib/jwt";
import { Thumbnail, ThumbnailPack, ThumbnailPuzzle } from "@lib/types";
import { chainIds } from "@lib/walletConstants";

export const epochMinus30s = () => Math.round(new Date().getTime() / 1000) - 30;

// Routes
export const routeLandingUrl = (slug: string) =>
  `/${PUZZLE_LANDING_BASE}/${slug}`;
export const packsLandingUrl = (slug: string) =>
  `/${PACK_LANDING_BASE}/${slug}`;
export const routeSuccessUrl = (slug: string) =>
  `/${PUZZLE_SUCCESS_BASE}/${slug}`;
export const routeFailUrl = (slug: string) => `/${PUZZLE_FAILED_BASE}/${slug}`;
export const collectionBaseUrl = (isPack: boolean) => {
  return isPack ? `/${PACK_COLLECTION_BASE}` : `/${PUZZLE_COLLECTION_BASE}`;
};

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

// Thumbnail grid
export const isTypePack = (
  data: ThumbnailPack | ThumbnailPuzzle
): data is ThumbnailPack => {
  return (data as ThumbnailPack).pack_name !== undefined;
};

// normalize pack and puzzle data for Thumbnail
export const thumbnailData = (
  data: ThumbnailPack | ThumbnailPuzzle
): Thumbnail => {
  const pack = isTypePack(data);
  // TODO: remove this once packs get nft images
  const cloudinary_id = pack
    ? undefined
    : data.nft?.nft_metadatum?.cloudinary_id || undefined;

  return {
    id: pack ? data.pack_id : data.puzzle_id,
    name: pack ? data.pack_name : data.simple_name,
    url: pack
      ? packsLandingUrl(data.simple_name)
      : routeLandingUrl(data.landing_route),
    cloudinary_id,
  };
};

export const validChain = (chain: number) => chainIds.includes(chain);

export const generateUserDeleteUrl = async (userId: string, email?: string) => {
  const jwt = await makeUserToken(
    {
      claims: {
        [IK_CLAIMS_NAMESPACE]: { puzzles: [] },
      },
    },
    userId
  );

  const url = new URL("/users", ikApiUrlBase);
  url.searchParams.set("userId", userId);
  url.searchParams.set("jwt", jwt);
  email && url.searchParams.set("email", email);

  return url;
};
