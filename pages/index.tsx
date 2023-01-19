import { useCallback } from "react";
import { NextPage } from "next";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

import { gqlApiSdk } from "@lib/server";
import { heroStars } from "@lib/animations/hero-stars";
import { PACK_COLLECTION_BASE } from "@lib/constants";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import NewsLetterForm from "@components/email-newsletter";
import Section from "@components/section";
import Text from "@components/text";
import Heading from "@components/heading";
import Seo from "@components/seo";
import Button from "@components/button";
import Flicker from "@components/flicker";

interface PageProps {
  count: number;
  puzzleId: string;
}

const Landing: NextPage<PageProps> = ({ count, puzzleId }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const SuccessComponent = () => (
    <div
      data-cy="success_message_check"
      className="container my-16 flex justify-center max-w-[12rem]"
    >
      <Button text="Play More" fullWidth href={`/${PACK_COLLECTION_BASE}`} />
    </div>
  );

  return (
    <Wrapper full radialBg={false}>
      <Seo />

      {/* Top puzzle */}
      <div className="slice--top w-full radial-bg relative z-0 overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-black opacity-40" />

        <Particles
          id="tsparticles-hero"
          className="absolute top-0 left-0 h-full w-full z-0"
          options={heroStars}
          init={particlesInit}
        />

        <div className="relative z-10">
          <Section largePadding={false}>
            <div className="text-center mb-8 md:mb-12">
              <Heading as="h1" visual="l">
                This is an Infinity Keys h
                <Flicker once bold delay=".3s">
                  un
                </Flicker>
                t.
              </Heading>
            </div>

            <Puzzle
              puzzleId={puzzleId}
              count={count}
              SuccessComponent={SuccessComponent}
              forwardOnFail={false}
            />
            <div className="text-white text-center mt-10 sm:text-xl md:text-2xl flicker-container">
              <p className="leading-normal">
                Find the c<Flicker delay=".6s">l</Flicker>
                ues and enter the key.
              </p>
              <p className="leading-normal">
                Hunt f<Flicker delay=".8s">o</Flicker>r{" "}
                <Flicker delay="1s">c</Flicker>
                lues and <Flicker delay="1.2s">k</Flicker>
                eys anywhere.
              </p>
              <p className="leading-normal">(Try the colored letters!)</p>
            </div>
          </Section>
        </div>
      </div>

      {/* Bottom of puzzle */}

      {/* About */}
      <main className="w-full bg-blue-800">
        <Section>
          <div className="mx-auto max-w-md sm:max-w-2xl">
            <Heading as="h1" visual="l">
              <span className="block">What is</span>
              <span className="block text-turquoise">Infinity Keys?</span>
            </Heading>
            <Text>
              Infinity Keys is a gamified task-reward platform that allows creators to build engaging virtual quests and own your own alternative marketing pipeline.
            </Text>
            <Text>
              Creators build fun challenges that have stories and gaming hooks, and use them to direct new audiences to evergreen content or special events.
            </Text>
            <Text>
              We focus on gamification, and are building a platform and community to make your marketing tasks more fun, enaging, memorable, and long-lasting.
            </Text>
            <Text>
              Read more about the vision, background, and platform behind the Society of the Infinite Keys in our docs - or click PLAY above and try it out for yourself.
            </Text>
            <Text>
              There&apos;s treasure everywhere!
            </Text>
          </div>
        </Section>
      </main>

      {/* Newsletter*/}
      <div className="bg-blue-800 w-full">
        <Section>
          <div className="mx-auto text-center max-w-md sm:max-w-xl">
            <Heading visual="l" turquoise>
              Sign Up for Email Updates!
            </Heading>
            <Text>
              Get updates about new features and puzzles from the Infinity Keys
              team.
            </Text>
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
