import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useForm, ValidationError } from "@formspree/react";
import ButtonSocialTwitter from "@components/button-social-twitter";

import { IK_FORMSPREE_CODE } from "@lib/constants";
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
        <title>WAGMI</title>
      </Head>

      <div className="ik-page radial-bg scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
          </header>

          <main className="flex flex-col items-center justify-center w-full flex-1 z-10 ">
            {state.succeeded && <p>Thanks for joining, we will be in touch!</p>}
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
                  {/* <label htmlFor="name">Name</label> */}
                  <input
                    className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                    type="text"
                    placeholder="&rsaquo; Enter your name"
                    name="name"
                    id="name"
                  />
                  {/* <label htmlFor="email">Email address</label> */}
                  <input
                    className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                    type="email"
                    placeholder="&rsaquo; Enter your email address"
                    name="email"
                    id="email"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                  <button
                    className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
                    type="submit"
                    value="Join the mailing list"
                    disabled={state.submitting}
                  >
                    Join the mailing list
                  </button>
                </form>
                <div className="mt-6 flex">
                  <div className="w-2/4 flex items-center justify-center">
                    <ButtonSocialTwitter />
                  </div>
                  <div className="w-2/4">
                    <Link href="https://www.youtube.com">
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
                      <Link href="/avalanche">
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
      formSpreeCode: IK_FORMSPREE_CODE,
    },
  };
}
