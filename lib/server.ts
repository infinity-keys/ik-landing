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
export const gqlApiSdk = async () => {
  const token = await makeApiToken();

  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT || "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getSdk(client);
};
