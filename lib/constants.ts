export const MAGIC_CODE = process.env.INFINITY_KEYS_ACCESS_CODE;
export const MAGIC_CODE_AVALANCHE =
  process.env.INFINITY_KEYS_ACCESS_CODE_AVALANCHE;

export const JWT_SECRET_KEY = process.env.INFINITY_KEYS_SECRET;
export const IK_ACCESS_COOKIE = "ik-jwt";
export const IK_CLAIMS_NAMESPACE = "https://infinitykeys.io";

// Access code for formspree
export const IK_FORMSPREE_CODE = process.env.INFINITY_KEYS_FORMSPREE_CODE || "";

// Zero if not set
export const MAGIC_CODE_CHAR_COUNT = (MAGIC_CODE || "").length;
export const MAGIC_CODE_CHAR_COUNT_AVALANCHE = (MAGIC_CODE_AVALANCHE || "")
  .length;
