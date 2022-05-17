/**
 * @file
 *
 * GraphQL geenerated schemas provide an SDK object used for querieis and mutations.
 */
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@lib/generated/graphql";
import { makeApiToken } from "@lib/jwt";

// Only use for API/backend NOT clientside

// GQL sdk for nextjs serverless/"backend" use
let sdk: ReturnType<typeof getSdk> | undefined = undefined;
export const gqlApiSdk = async () => {
  if (sdk) return sdk;

  const token = await makeApiToken();

  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT || "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  sdk = getSdk(client);

  return sdk;
};
