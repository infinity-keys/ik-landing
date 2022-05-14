import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { JWT_SECRET_KEY } from "@lib/constants";
import { epochMinus30s } from "./utils";

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

// Anonymous
// export const makeAnonToken = async () => {
//   const token = await new SignJWT({
//     ...anonymousClaims,
//   }).setExpirationTime("24H");
//   return decorate(token);
// };

// API/backend tokens
export const makeApiToken = () =>
  new SignJWT({
    ...apiClaims,
  })
    .setExpirationTime("1H")
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt(epochMinus30s()) // Offset 30s because stuipd clocks
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
