/**
 * @file
 *
 * GraphQL geenerated schemas provide an SDK object used for querieis and mutations.
 */
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@lib/generated/graphql";

const endpoint = process.env.GRAPHQL_ENDPOINT || "";

export const client = new GraphQLClient(endpoint, { headers: {} });

export const gqlSdk = getSdk(client);
