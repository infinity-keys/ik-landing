import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useForm, ValidationError } from "@formspree/react";
import ButtonSocialTwitter from "@components/button-social-twitter";

import { ETH_ADDRESS_REGEX } from "@lib/constants";
import Wrapper from "@components/wrapper";
import Link from "next/link";

interface PageProps {
  formSpreeCode: string;
}

const Gated: NextPage<PageProps> = ({ formSpreeCode }) => {
  const [state, handleSubmit] = useForm(formSpreeCode);

  return (
    <Wrapper>
      <Head>
        <title>Avalanche</title>
      </Head>

      <div className="ik-page radial-bg scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
          </header>

          <main className="flex flex-col items-center justify-center w-full flex-1 z-10 ">
            {state.succeeded && <p>Thank you for testing with us.</p>}
            {!state.succeeded && (
              <div className="">
                <h1 className="text-3xl font-medium mb-6">Coming soon.</h1>

                <p className="text-sm font-normal mb-4">
                  Discover clues, solve puzzles, and collect digital items to
                  discover real treasure — or create a quest of your own.
                </p>
                <p className="text-sm font-normal mb-4">
                  Infinity Keys is a forthcoming massively multiplayer metaverse
                  treasure hunt platform.
                </p>
                <p className="text-sm font-normal mb-12">
                  There&apos;s treasure everywhere.
                </p>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="wallet" className="block pb-2">
                    Wallet address
                  </label>
                  <input
                    className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                    type="text"
                    placeholder="&rsaquo; starts with 0x, 40 characters long"
                    name="wallet"
                    id="wallet"
                    pattern={ETH_ADDRESS_REGEX.source}
                  />
                  <ValidationError
                    prefix="Wallet"
                    field="wallet"
                    errors={state.errors}
                  />
                  <button
                    className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
                    type="submit"
                    value="submit"
                    disabled={state.submitting}
                  >
                    Submit
                  </button>
                </form>
                <div className="mt-6 flex">
                  <div className="w-2/4 flex items-center justify-center">
                    <ButtonSocialTwitter />
                  </div>
                  <div className="w-2/4">
                    <Link href="/puzzle/avalanche">
                      <a>
                        <Image
                          src="/ik-logo-social.png"
                          alt="Infinity Keys logo for Avalanche Summit"
                          width={320}
                          height={320}
                          className="pb-4"
                        />
                      </a>
                    </Link>
                    <p className="text-center">
                      <Link href="https://www.youtube.com/c/Avalancheavax">
                        Watch the Avalanche Summit Workshop.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Gated;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  return {
    props: {
      formSpreeCode: "mwkyaqkr",
    },
  };
}
