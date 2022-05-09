import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { JWT_SECRET_KEY } from "@lib/constants";

export type HasuraRoles = "anonymous" | "user" | "manager" | "api" | "admin";

export interface HasuraClaims {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": HasuraRoles[];
    "x-hasura-default-role": HasuraRoles;
  };
}

// const anonymousClaims: HasuraClaims = {
//   "https://hasura.io/jwt/claims": {
//     "x-hasura-allowed-roles": ["anonymous", "user", "manager", "api", "admin"],
//     "x-hasura-default-role": "anonymous",
//   },
// };
const apiClaims: HasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["anonymous", "user", "manager", "api", "admin"],
    "x-hasura-default-role": "api",
  },
};

// Add the shared parts of the JWT
export const decorate = async (token: SignJWT) =>
  token
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

// Anonymous
// export const makeAnonToken = async () => {
//   const token = await new SignJWT({
//     ...anonymousClaims,
//   }).setExpirationTime("24H");
//   return decorate(token);
// };

// API/backend tokens
export const makeApiToken = async () => {
  const token = await new SignJWT({
    ...apiClaims,
  }).setExpirationTime("1H");
  return decorate(token);
};

export const apiToken = makeApiToken();
