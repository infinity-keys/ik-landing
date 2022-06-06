import Head from "next/head";
import Image from "next/image";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import Discord from "@components/svg/discord-svg";

import type { NextPage } from "next";
import TwitterIcon from "@components/svg/twitter-icon-svg";
import Map from "@components/svg/map-svg";
import { gqlApiSdk } from "@lib/server";
import Header from "@components/header-nav";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Hunts", href: "#" },
  { name: "Partner", href: "#partner" },
  { name: "Docs", href: "#" },
];

interface PageProps {
  count: number;
  puzzleId: string;
}

const Landing: NextPage<PageProps> = ({ count, puzzleId }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="scanlines">
        {/* Nav */}
        <Header navigation={navigation} />

        {/* Top puzzle */}
        <div className="slice--top w-full h-screen min-h-[54rem] flex items-center radial-bg relative z-0">
          <div className="w-full mr-auto ml-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Image src="/logo.svg" width={150} height={94} alt="IK logo" />
            </div>
            <div className="mt-6 text-base text-center text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              <p>
                This is an Infinity Keys h<span className="underline">un</span>
                t.
              </p>
              <p>
                You find the c<span className="underline">l</span>ues y
                <span className="underline">o</span>u and enter the key.
              </p>
              <p>
                Hunt for <span className="underline">c</span>lues anywhere, li
                <span className="underline">k</span>e embedded in this page
              </p>
              <p>(find the underlined letters!)</p>
            </div>
            <Puzzle count={count} puzzleUri={puzzleId} />
          </div>
          <div className="absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-black opacity-40"></div>
        </div>
        {/* Bottom of puzzle */}

        {/* About */}
        <main>
          <div className="pt-10 bg-blue-800 sm:pt-16 lg:pt-12 lg:pb-20 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="xsm:pb-6 lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-left text-white sm:mt-5 sm:text-6xl lg:mt-20 xl:text-6xl">
                      <span className="block">What is</span>
                      <span className="block text-turquoise">
                        Infinity Keys?
                      </span>
                    </h1>
                    <p className="mt-6 text-base text-left text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Infinity Keys is a puzzle game that takes players on hunts
                      through our digital world. Players find clues, decipher
                      keys, and claim treasure. It’s also a platform where
                      anyone can build their own hunts, keys, and treasure to
                      create engaging experiences for others.
                    </p>
                    <p className="mt-5 text-base text-left  text-gray-300 sm:pb-6 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Find out how it works below.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Game Flow */}
        {/* <div className="relative pt-32 pb-32">
          <Image
            src="/blue-angles.jpeg"
            layout="fill"
            objectFit="cover"
            alt="Blue geoddesic background"
          />
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24 relative">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    IK Treasure Hunts
                  </h2>
                  <p className="mt-4 text-lg text-gray-100">
                    1. Find clues across the web. 2. Decipher clues. 3. Enter
                    keys on the Infinity Keys App. 4. Claim digital treasure. 5.
                    Build your own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Partner */}
        <div id="partner" className="flex items-center relative">
          <div className="justify-items-center items-center md:mx-auto md:max-w-7xl md:px-8 md:grid md:grid-cols-2 md:grid-flow-col-dense md:gap-24 relative">
            <div className="lg:w-90 lg:h-90 lg:col-start p-10">
              <Map />
            </div>
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6 p-5">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Build an Infinity Keys Hunt for your Project
                  </h2>
                  <p className="mt-6 text-lg text-gray-100">
                    Infinity Keys is a platform to build puzzles, hunts, and
                    treasure. If you would like to use these tools to increase
                    engagement with your community, users, players, or fans,
                    please reach out. We are currently selecting projects to
                    work with on initial partner hunts, so please reach out for
                    business inquiries.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base text-center text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                If you are a brand interested in integrating an Infinity Keys
                puzzle please contact us here
              </p>
              <div className="mt-10 sm:mt-12 flex justify-center">
                <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                  <div className="sm:flex">
                    <div className="min-w-0 flex-1 mb-4">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="sm: mb-4 sm:ml-3">
                      <button
                        type="submit"
                        className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter*/}
        <div className="">
          <div className="pt-10 bg-blue-800 sm:pt-16 lg:pt-12 lg:pb-20">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-center text-white sm:mt-5 sm:text-6xl lg:mt-20 xl:text-6xl">
                    <span className="block text-gray-300 ">
                      Sign Up for Our Newsletter!
                    </span>
                  </h1>
                  <div className="mt-10 sm:mt-12 flex justify-center">
                    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                          />
                        </div>
                        <div className="m-4 sm:mt-0 sm:ml-3">
                          <button
                            type="submit"
                            className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="">
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 bg-blue">
            <nav className="container px-4 sm:px-6 lg:px-8" aria-label="Top">
              <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                {/* left */}
                <div className="hidden sm:block items-center">
                  <a href="#">
                    <span className="sr-only">Infinity Keys</span>
                    <Image
                      src="/logo.svg"
                      width={100}
                      height={70}
                      alt="IK logo"
                    />
                  </a>
                </div>
                {/* center */}
                <div className="menu-items flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-2xl font-medium hover:text-turquoise"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 icons">
                  <div className="twitterIcon">
                    <TwitterIcon />
                  </div>
                  <div className="discordIcon">
                    <Discord />
                  </div>
                </div>
                {/* right */}
                <div className="ml-10 space-x-4">
                  <a
                    href="#"
                    className="inline-block bg-blue hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-2xl font-medium text-white hover:text-blue"
                  >
                    Play
                  </a>
                </div>
              </div>
            </nav>
            <p className="mt-8 text-center text-base text-gray-500">
              &copy; 2022 Infinity Keys. All rights reserved.
            </p>
          </div>
        </footer>

        {/* End scanlines wrapper */}
      </div>
    </Wrapper>
  );
};

export default Landing;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();

  const { puzzles } = await gql.PuzzleInfoByLanding({ landing: "landing" });
  const [{ puzzle_id, solution_char_count }] = puzzles;

  return {
    props: {
      puzzleId: puzzle_id,
      count: solution_char_count || 0,
    },
  };
}
