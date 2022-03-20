import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";

import { MAGIC_CODE_CHAR_COUNT } from "@lib/constants";
import Wrapper from "@components/wrapper";
import MaterialIcon from "@components/svg/material-lock-svg";
import NavAvalanche from "@components/nav-avalanche";

interface PageProps {
  count: number;
}

const Home: NextPage<PageProps> = ({ count }) => {
  const inputProps = loRange(count).map(() => ({
    className: "ik-code-input",
  }));

  // const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = async (input: string) => {
    if (input.length === count) {
      setIsLoading(true);
      const res = await fetch(`/api/check/code/landing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: input }),
      });

      // console.log(res);

      if (!res.ok) {
        setTimeout(() => {
          setIsLoading(false);
          return;
        }, 2000);
      } else {
        // Success, forward to next page
        // If we made it here, we have a valid code and can forward
        const results = await res.json();
        setTimeout(() => {
          router.push(results.forwardTo);
        }, 1500);
      }
    }
  };

  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
            <meta name="description" content="Keys keys keys" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {isLoading && (
            <div className="loader">
              <div className="ball-clip-rotate-multiple">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {!isLoading && (
            <main className="flex justify-center w-full z-10">
              <div>
                <div className="flex">
                  <div className="w-6">
                    <MaterialIcon />
                  </div>
                  <h1 className="text-base font-bold pt-2 pl-4">Passcode</h1>
                </div>
                <div className="magic-input pt-7 text-turquoise font-bold text-5xl">
                  <RICIBs
                    amount={count}
                    handleOutputString={handleInput}
                    inputRegExp={/^.*$/}
                    autoFocus={true}
                    inputProps={inputProps}
                  />
                </div>
              </div>
            </main>
          )}

          <div className="ik-front-bottom w-full">
            <NavAvalanche />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  return {
    props: {
      count: MAGIC_CODE_CHAR_COUNT,
    },
  };
}
