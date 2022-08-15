// JWT stuff
export const JWT_SECRET_KEY = process.env.INFINITY_KEYS_SECRET;
export const IK_ID_COOKIE = "ik-id";
export const IK_CLAIMS_NAMESPACE = "https://infinitykeys.io";

// Crypto stuff
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
export const welcome = "Thanks for playing :)";

// Route stuff, see utils.ts:Routes
export const PUZZLE_LANDING_BASE = "puzzle";
export const PUZZLE_SUCCESS_BASE = "solved";
export const PUZZLE_FAILED_BASE = "puzzle"; // back to landing

// Puzzles per page
export const PAGINATION_COUNTS = [16, 32, 64];

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = "infinity-keys";
