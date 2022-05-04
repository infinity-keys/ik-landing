module.exports = {
  schema: [
    {
      [process.env.GRAPHQL_ENDPOINT]: {
        // headers: {
        //   Authorization: "Bearer " + process.env.AUTH_TOKEN,
        // },
      },
    },
  ],
  documents: ["./lib/**/*.gql"],
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
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
