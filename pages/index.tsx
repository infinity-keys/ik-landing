import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import PartnerForm from "@components/email-partner";
import NewsLetterForm from "@components/email-newsletter";
import Section from "@components/section";
import Text from "@components/text";
import Heading from "@components/heading";
import Seo from "@components/seo";
import Button from "@components/button";

import { PACK_COLLECTION_BASE } from "@lib/constants";
import LensLogo from "@components/svg/partner-logos/lens_logo-svg";
import SagaLogo from "@components/svg/partner-logos/saga_logo-png";
import SanLogo from "@components/svg/partner-logos/san_logo-png";
import PnLogo from "@components/svg/partner-logos/pn_logo-png";
import IslandersLogo from "@components/svg/partner-logos/islanders_logo-png";
import RehashLogo from "@components/svg/partner-logos/rehash_logo-jpeg";
import Flicker from "@components/flicker";

interface PageProps {
  count: number;
  puzzleId: string;
}

const Landing: NextPage<PageProps> = ({ count, puzzleId }) => {
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
      <div className="slice--top w-full radial-bg relative z-0 min-h-[calc(100vh-80px)] flex items-center">
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

          <div className="absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-black opacity-40"></div>
        </Section>
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
              Infinity Keys is a no-code creator tools platform for brands and
              fans to build engaging metaverse treasure hunt experiences.
            </Text>
            <Text>
              The IK team and community are building a series of demo hunts and
              puzzles to show the power of engagement using scalable games with
              opt-in Web3 NFTs as an alternative to passive, impression-based
              marketing.
            </Text>
            <Text>
              If you&apos;re a player, find clues, decipher keys, and claim
              treasure. Join our online communities on Twitter and Discord to
              connect with other players and builders - and click on the Puzzles
              button up top to see the variety of hunts, clues, puzzles, and
              treasure live now.
            </Text>
          </div>
        </Section>
      </main>

      {/* Collab */}
      <Section id="collab">
        <div className="items-center md:grid md:grid-cols-2 md:grid-flow-col-dense md:gap-24">
          <div className="max-w-sm mx-auto">
            <Heading visual="m">Collabs</Heading>
            <div className="pt-4 items-center grid grid-cols-3 gap-6 ">
              <a href="https://www.infinitykeys.io/pack/lens-bogota-pack">
                <LensLogo />
              </a>
              <a href="https://www.infinitykeys.io/pack/saga-wormhole-pack">
                <SagaLogo />
              </a>
              <a href="https://www.infinitykeys.io/pack/san-creator-pack">
                <SanLogo />
              </a>
              <a href="https://www.infinitykeys.io/pack/p0-pack">
                <PnLogo />
              </a>
              <a href="https://www.infinitykeys.io/puzzle/finkel-islanders">
                <IslandersLogo />
              </a>
              <a href="https://www.infinitykeys.io/puzzle/second-season-rehash">
                <RehashLogo />
              </a>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            <p className="text-turquoise text-lg mb-4">
              Engagement &gt; Impressions.
            </p>

            <Heading>Create Infinity Keys Challenges for your Project</Heading>
            <Text>
              We work with projects to build new types of digital keys for
              engaging hunts and puzzles.
            </Text>
            <Text>
              If you would like to use IK to increase engagement with your
              community, users, players, or fans, please reach out, and we will
              contact you directly.
            </Text>
            <div className="mt-10 sm:mt-12 flex justify-center">
              <PartnerForm />
            </div>
          </div>
        </div>
      </Section>

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
