import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import RICIBs from "react-individual-character-input-boxes";

import MaterialIcon from "@components/svg/material-lock";

// Disable ESLint for this file because auth needs full redirect, not SPA routing
/*eslint-disable @next/next/no-html-link-for-pages*/

// 5 inputs, and props per
const inputCount = 5;
const inputProps = Array.from(Array(inputCount).keys()).map(() => ({
  className: "ik-code-input",
}));

const Home: NextPage = () => {
  // const { user, error, isLoading } = useUser();

  const handleInput = async (input: string) => {
    console.log(input);
    if (input.length === inputCount) {
      const res = await fetch(`/api/check/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: input }),
      });

      if (!res.ok) {
        return;
      }
      // If we made it here, we have a valid code and can forward
      const results = await res.json();
      location.href = results.forwardTo;
    }
  };

  return (
    <div className="ik-page flex flex-col items-center justify-center min-h-screen relative bg-blue">
      <Head>
        <title>Infinity Keys</title>
        <meta name="description" content="Keys keys keys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 z-10">
        <div>
          <div className="w-full flex items-center">
            <div className="w-6">
              <MaterialIcon />
            </div>
            <h1 className="text-base font-bold text-gray-100 pt-2 pl-4">
              Password
            </h1>
          </div>

          <div className="magic-input pt-7">
            <RICIBs
              amount={inputCount}
              handleOutputString={handleInput}
              inputRegExp={/^[0-9]$/}
              autoFocus={true}
              inputProps={inputProps}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
