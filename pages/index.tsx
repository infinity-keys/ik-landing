import { NextPage } from "next";
import Head from "next/head";

import { gqlApiSdk } from "@lib/server";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import Map from "@components/svg/map-svg";
import Header from "@components/header";
import Footer from "@components/footer";
import PartnerForm from "@components/email-partner";
import NewsLetterForm from "@components/email-newsletter";
import WalletEmail from "@components/wallet-email";

interface PageProps {
  count: number;
  puzzleId: string;
}

const Landing: NextPage<PageProps> = ({ count, puzzleId }) => {
  const SuccessComponent = () => (
    <div className="container px-4 flex flex-col items-center justify-center max-w-sm">
      <WalletEmail
        puzzleId={puzzleId}
        successMessage="Now you're playing Infinity Keys! Sign up for future updates and rewards. Solve more puzzles. Find more clues on IK social channels."
      />
    </div>
  );

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="scanlines">
        {/* Navigation Header */}
        <Header />

        {/* Top puzzle */}
        <div className="slice--top w-full pt-4 pb-4 min-h-0 flex items-center radial-bg relative z-0">
          <div className="w-full mr-auto ml-auto px-4 sm:px-6 lg:px-8">
            <Puzzle
              puzzleId={puzzleId}
              count={count}
              SuccessComponent={SuccessComponent}
            />
            <div className="text-white text-left pl-6 sm:pl-16 md:pl-28 lg:pl-48 xl:pl-96 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              <p className="text-[1.35rem] md:text-[2.5rem] leading-normal">
                This is an Infinity Keys h
                <span className="font-semibold text-turquoise">un</span>
                t.
              </p>
              <p className="md:text-[1.50rem] leading-normal">
                Find the c
                <span className="font-semibold text-turquoise">l</span>
                ues and enter the key.
              </p>
              <p className="md:text-[1.50rem] leading-normal">
                Hunt f<span className="font-semibold text-turquoise">o</span>r{" "}
                <span className="font-semibold text-turquoise">c</span>
                lues and <span className="font-semibold text-turquoise">k</span>
                eys anywhere.
              </p>
              <p className="md:text-[1.50rem] leading-normal">
                (Try the colored letters!)
              </p>
            </div>
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
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-left text-white sm:mt-5 sm:text-6xl lg:mt-20 xl:text-6xl">
                      <span className="block">What is</span>
                      <span className="block text-turquoise">
                        Infinity Keys?
                      </span>
                    </h1>
                    <p className="mt-6 pb-6 text-base text-left text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Infinity Keys is a puzzle game that takes players on hunts
                      through our digital world. Players find clues, decipher
                      keys, and claim treasure. It&apos;s also a platform where
                      anyone can build their own hunts, keys, and treasure to
                      create engaging experiences for others.
                    </p>
                    {/* <p className="mt-5 text-base text-left  text-gray-300 sm:pb-6 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Find out how it works below.
                    </p> */}
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

        {/* Collab */}
        <div id="collab" className="flex items-center relative">
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
                    If you would like to use these tools to increase engagement
                    with your community, users, players, or fans, please reach
                    out. We are currently selecting projects to work with on
                    alpha hunts, so please reach out for business inquiries.
                  </p>
                </div>
              </div>
              {/* <p className="mt-6 text-base text-center text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                If you are a brand interested in integrating an Infinity Keys
                puzzle please contact us here
              </p> */}
              <div className="mt-10 sm:mt-12 flex justify-center">
                <PartnerForm />
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
                    <span className="block text-turquoise ">
                      Sign Up for Email Updates!
                    </span>
                  </h1>
                  <div className="mt-10 sm:mt-12 flex justify-center">
                    <NewsLetterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
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
