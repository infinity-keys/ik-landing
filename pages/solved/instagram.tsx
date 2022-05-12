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
        <title>Avalanche</title>
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
                  Eth address or connect wallet here.
                </p>

                <div className="mt-6 flex">
                  <div className="w-2/4 flex items-center justify-center">
                    <ButtonSocialTwitter />
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
