// Load the same env vars from nextjs
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

module.exports = {
  schema: [
    {
      [process.env.GRAPHQL_ENDPOINT]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          // Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ["./lib/graphql.gql"],
  overwrite: true,
  generates: {
    "./lib/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        skipTypename: false,
        // withHooks: true,
        // withHOC: false,
        // withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
