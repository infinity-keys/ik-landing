/**
 * @file
 *
 * GraphQL geenerated schemas provide an SDK object used for querieis and mutations.
 */
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@lib/generated/graphql";
import { apiToken } from "@lib/jwt";

// Only use for API/backend NOT clientside
const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
});

// GQL sdk for nextjs serverless/"backend" use
export const gqlApiSdk = getSdk(client);
