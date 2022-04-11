import Head from "next/head";
import Image from "next/image";

import { MAGIC_CODE_CHAR_COUNT } from "@lib/constants";
import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";

import type { NextPage } from "next";

const navigation = [
  { name: "Puzzle", href: "#" },
  { name: "About", href: "#" },
  { name: "Quests", href: "#" },
  { name: "Contact", href: "#" },
];

interface PageProps {
  count: number;
}

const Landing: NextPage<PageProps> = ({ count }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="scanlines">
        <header className="w-full fixed z-50">
          <nav className="container px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
              {/* left */}
              <div className="flex items-center">
                <a href="#">
                  <span className="sr-only">Infinity Keys</span>
                  <Image src="/logo.svg" width={80} height={50} alt="IK logo" />
                  {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                /> */}
                </a>
              </div>
              {/* center */}
              <div className="hidden space-x-8 lg:block">
                {navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium hover:text-indigo-50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              {/* right */}
              <div className="ml-10 space-x-4">
                <a
                  href="#"
                  className="inline-block bg-turquoise hover:bg-turquoiseDark py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-turquoise hover:bg-indigo-50"
                >
                  Sign up
                </a>
              </div>
            </div>
            <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <div className="slice--top w-full h-screen min-h-[54rem] flex items-center radial-bg relative z-0">
          <div className="container px-4 sm:px-6 lg:px-8">
            <Puzzle count={count} puzzleUri="landing" />
          </div>
          <div className="absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-black opacity-40"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  return {
    props: {
      count: MAGIC_CODE_CHAR_COUNT,
    },
  };
}
