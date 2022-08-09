import { NextPage } from "next";
import Head from "next/head";

import { gqlApiSdk } from "@lib/server";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import Map from "@components/svg/map-svg";
import PartnerForm from "@components/email-partner";
import NewsLetterForm from "@components/email-newsletter";
import Alert from "@components/alert";
import Section from "@components/section";

interface PageProps {
  count: number;
  puzzleId: string;
}

const Landing: NextPage<PageProps> = ({ count, puzzleId }) => {
  const SuccessComponent = () => (
    <div className="container my-9 flex justify-center max-w-sm">
      <Alert text="Now you're playing Infinity Keys! Solve more puzzles. Find more clues on IK social channels." />
    </div>
  );

  return (
    <Wrapper full radialBg={false}>
      <Head>
        <title>Infinity Keys</title>
      </Head>

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
              Find the c<span className="font-semibold text-turquoise">l</span>
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
      <main className="w-full bg-blue-800">
        <Section>
          <div className="mx-auto max-w-md sm:max-w-2xl text-white">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-6xl xl:text-6xl">
              <span className="block">What is</span>
              <span className="block text-turquoise">Infinity Keys?</span>
            </h1>
            <div className="text-base sm:text-xl lg:text-lg xl:text-xl">
              <p className="mt-7">
                Infinity Keys is a no-code creator tools platform for brands and
                fans to build engaging metaverse treasure hunt experiences.
              </p>
              <p className="mt-7">
                The IK team and community are building a series of demo hunts
                and puzzles to show the power of engagement using scalable games
                with opt-in Web3 NFTs as an alternative to passive,
                impression-based marketing.
              </p>
              <p className="mt-7">
                If you&apos;re a player, find clues, decipher keys, and claim
                treasure. Join our online communities on Twitter and Discord to
                connect with other players and builders - and click on the
                Puzzles button up top to see the variety of hunts, clues,
                puzzles, and treasure live now.
              </p>
            </div>

            {/* <p className="mt-5 text-base text-left  text-gray-300 sm:pb-6 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Find out how it works below.
                    </p> */}
          </div>
        </Section>
      </main>

      {/* Collab */}
      <Section id="collab">
        <div className="items-center md:grid md:grid-cols-2 md:grid-flow-col-dense md:gap-24">
          <div className="mb-16 flex justify-center">
            <Map />
          </div>
          <div className="max-w-xl mx-auto">
            <div className="text-lg">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Build an Infinity Keys Hunt for your Project
              </h2>
              <p className="mt-7">Engagement &gt; Impressions.</p>
              <p className="mt-7">
                We work with projects to build new types of digital keys for
                engaging hunts and puzzles.
              </p>
              <p className="mt-7">
                If you would like to use IK to increase engagement with your
                community, users, players, or fans, please reach out.
              </p>
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
      </Section>

      {/* Newsletter*/}

      <div className="bg-blue-800 w-full">
        <Section>
          <div className="mx-auto max-w-md sm:max-w-2xl">
            <h1 className="text-4xl tracking-tight font-extrabold text-center text-white sm:text-6xl xl:text-6xl">
              <span className="text-turquoise">Sign Up for Email Updates!</span>
            </h1>
            <div className="mt-10 sm:mt-12 flex justify-center">
              <NewsLetterForm />
            </div>
          </div>
        </Section>
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
