import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { JWT_SECRET_KEY } from "@lib/constants";

export interface HasuraClaims {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["anonymous", "user", "manager", "api", "admin"];
    "x-hasura-default-role": "anonymous";
  };
}

const anonymousClaims: HasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["anonymous", "user", "manager", "api", "admin"],
    "x-hasura-default-role": "anonymous",
  },
};

export const anonymousToken = async () => {
  const token = await new SignJWT({
    ...anonymousClaims,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  return token;
};
