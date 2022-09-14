import fs from "fs";
import { URL } from "url";
import fetch from "node-fetch";
import env from "@next/env";

// Set admin secret to process.env.HASURA_GRAPHQL_ADMIN_SECRET
env.loadEnvConfig(process.cwd());

const gql = `query MyQuery($siteName: String) {
  puzzles(where: {simple_name: {_eq: $siteName}}) {
    final_step
    input_type
    fail_route
    fail_message
  }
}`;

const doIt = async () => {
  // Example: Make GraphQL calls
  const res = await fetch("https://hasura-2v34.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    body: JSON.stringify({
      operationName: "MyQuery",
      query: gql,
      variables: { siteName: "notright" },
    }),
  });
  const results = await res.json();
  console.log(results.data.puzzles);

  // Example: read json
  fs.readFile(
    new URL("./csvjson.json", import.meta.url).pathname,
    (err, data) => {
      const changes = JSON.parse(data);
      const puzzles = changes.map((change) => String(change.Title));
      console.log(puzzles);
    }
  );
};

doIt();
