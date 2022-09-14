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
// how to create a mutation example

// const gqlModify = `mutation MyMutation ($siteName: String){
//   update_puzzles(where: {simple_name: {_eq: "$siteName"},
//   solution: {_eq: "$Input (Passcode)"},
//   fail_message: {_eq: "$Fail Message"},
//   input_type: {_eq: boxes},
//   landing_message: {_eq: "Instructions (old landing message)"}}) {

//   }
// }`;

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
    new URL("./updatedcsvjson.json", import.meta.url).pathname,
    (_err, data) => {
      const changes = JSON.parse(data);
      const puzzles = changes.map((change) => String(change.simple_name));
      console.log(puzzles);
    }
  );
};

doIt();
