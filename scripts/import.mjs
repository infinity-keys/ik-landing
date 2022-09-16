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

// mutation to update puzzle information
const gqlModify = `mutation MyMutation($simple_name: String, $input_type: puzzle_input_type_enum = boxes, $challenge: String = "", $fail_message: String = "", $landing_message: String = "", $solution: String = "", $success_message: String = "") {
  update_puzzles(_set: {input_type: $input_type, challenge: $challenge, fail_message: $fail_message, landing_message: $landing_message, solution: $solution, success_message: $success_message}, where: {simple_name: {_eq: $simple_name}}) {
    returning {
      input_type
      simple_name
    }
  }
}

`;

// query to retreive current puzzle information
const gqlAllPuzzles = `query MyPuzzles {
  puzzles {
    simple_name
    solution
    success_message
    fail_message
  }
}`;

const doIt = async () => {
  // query to retrieve current puzzle data
  const getPuzzles = await fetch(
    "https://hasura-2v34.onrender.com/v1/graphql",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
      body: JSON.stringify({
        operationName: "MyPuzzles",
        query: gqlAllPuzzles,
      }),
    }
  );
  const getResults = await getPuzzles.json();

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
  console.log(results);

  // Example: read json
  fs.readFile(
    new URL("./csvjson.json", import.meta.url).pathname,
    (_err, data) => {
      const changes = JSON.parse(data);
      const puzzles = changes.map((change) => String(change.simple_name));
      console.log(puzzles);
    }
  );

  // function to update by simple name
  const updatePuzzles = async (variables) => {
    console.log(variables);
    // const testRes = await fetch("https://hasura-2v34.onrender.com/v1/graphql", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    //   },
    //   body: JSON.stringify({
    //     operationName: "MyMutation",
    //     query: gqlModify,
    //     variables,
    //   }),
    // });
    // const testResults = await testRes.json();
    // return testResults;
  };

  // Test: mutation to update input boxes
  //   const testRes = await fetch("https://hasura-2v34.onrender.com/v1/graphql", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  //     },
  //     body: JSON.stringify({
  //       operationName: "MyMutation",
  //       query: gqlModify,
  //       variables: { simple_name: "communitycode", input_type: "boxes" },
  //     }),
  //   });
  //   const testResults = await testRes.json();
  //   console.log("test results", testResults.data.update_puzzles.returning);

  const getGoodData = (newData, oldData) => {
    return String(newData) ? String(newData) : oldData;
  };

  fs.readFile(
    new URL("./updatedcsvjson.json", import.meta.url).pathname,
    (_err, data) => {
      const changes = JSON.parse(data);
      changes.forEach((change) => {
        const oldPuzzle = getResults.data.puzzles.find(
          (puzzle) => puzzle.simple_name === String(change.simple_name)
        );

        updatePuzzles({
          simple_name: String(change.simple_name),
          challenge: String(change.Challenge),
          input_type: "boxes",
          landing_message: String(change["Instructions (old landing_message)"]),
          solution: getGoodData(change["Input (Passcode)"], oldPuzzle.solution),
          fail_message: getGoodData(
            change["Fail message"],
            oldPuzzle.fail_message
          ),
          success_message: getGoodData(
            change["Success Message"],
            oldPuzzle.success_message
          ),
        });
      });
    }
  );
};

doIt();
