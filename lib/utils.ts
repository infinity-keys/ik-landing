import {
  PUZZLE_FAILED_BASE,
  PUZZLE_LANDING_BASE,
  PUZZLE_SUCCESS_BASE,
  welcome,
} from "./constants";

export const epochMinus30s = () => Math.round(new Date().getTime() / 1000) - 30;

// Routes
export const routeLandingUrl = (slug: string) =>
  `/${PUZZLE_LANDING_BASE}/${slug}`;
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
