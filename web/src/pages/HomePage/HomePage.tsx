// import Alert from 'src/components/Alert/Alert'
import CloudImage from 'src/components/CloudImage/CloudImage'
import EmailNewsletter from 'src/components/EmailNewsletter/EmailNewsletter'
import EmailPartner from 'src/components/EmailPartner/EmailPartner'
import Heading from 'src/components/Heading/Heading'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import Wrapper from 'src/components/Wrapper/Wrapper'
import LensLogo from 'src/svgs/LensLogo'

/*
@TODO:
  Puzzle
*/

const HomePage = () => {
  // const SuccessComponent = () => (
  //   <div className="container my-9 flex max-w-sm justify-center">
  //     <Alert text="Now you're playing Infinity Keys! Solve more puzzles. Find more clues on IK social channels." />
  //   </div>
  // )

  return (
    <Wrapper full radialBg={false}>
      <Seo />

      {/* Top puzzle */}
      <div className="slice--top radial-bg relative z-0 w-full">
        <Section largePadding={false}>
          {/* <Puzzle
              puzzleId={puzzleId}
              count={count}
              SuccessComponent={SuccessComponent}
            /> */}
          <div className="mx-auto mt-5 max-w-md text-left text-white sm:max-w-2xl sm:text-xl lg:text-lg xl:text-xl">
            <p className="text-[1.35rem] leading-normal md:text-[2.5rem]">
              This is an Infinity Keys h
              <span className="font-bold text-turquoise">un</span>
              t.
            </p>
            <p className="leading-normal md:text-[1.50rem]">
              Find the c<span className="font-bold text-turquoise">l</span>
              ues and enter the key.
            </p>
            <p className="leading-normal md:text-[1.50rem]">
              Hunt f<span className="font-bold text-turquoise">o</span>r{' '}
              <span className="font-bold text-turquoise">c</span>
              lues and <span className="font-bold text-turquoise">k</span>
              eys anywhere.
            </p>
            <p className="leading-normal md:text-[1.50rem]">
              (Try the colored letters!)
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black opacity-40"></div>
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
        <div className="items-center md:grid md:grid-flow-col-dense md:grid-cols-2 md:gap-24">
          <div className="mx-auto max-w-sm">
            <Heading visual="m">Collabs</Heading>
            <div className="grid grid-cols-3 items-center gap-6 pt-4 ">
              <a href="https://www.infinitykeys.io/pack/lens-bogota-pack">
                <LensLogo />
              </a>
              <a href="https://www.infinitykeys.io/pack/saga-wormhole-pack">
                <CloudImage
                  id="website-assets/saga_logo_ifk2az"
                  alt="Saga Logo"
                  width={150}
                  height={150}
                />
              </a>
              <a href="https://www.infinitykeys.io/pack/san-creator-pack">
                <CloudImage
                  id="website-assets/san_logo_dijhbm"
                  alt="San Logo"
                  width={150}
                  height={150}
                />
              </a>
              <a href="https://www.infinitykeys.io/pack/p0-pack">
                <CloudImage
                  id="website-assets/pn_symbol_clean_lcvuu6"
                  alt="PN Logo"
                  width={200}
                  height={200}
                />
              </a>
              <a href="https://www.infinitykeys.io/puzzle/finkel-islanders">
                <CloudImage
                  id="website-assets/finkel_logo_nriuwc"
                  alt="Finkel Logo"
                  width={150}
                  height={150}
                />
              </a>
              <a href="https://www.infinitykeys.io/puzzle/second-season-rehash">
                <CloudImage
                  id="website-assets/rehash_logo_zwqhhw"
                  alt="Rehash Logo"
                  width={150}
                  height={150}
                />
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-xl">
            <p className="mt-4 mb-4 text-lg text-turquoise">
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
            <div className="mt-10 flex justify-center sm:mt-12">
              <EmailPartner />
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter*/}
      <div className="w-full bg-blue-800">
        <Section>
          <div className="mx-auto max-w-md text-center sm:max-w-xl">
            <Heading visual="l" turquoise>
              Sign Up for Email Updates!
            </Heading>
            <Text>
              Get updates about new features and puzzles from the Infinity Keys
              team.
            </Text>
            <div className="mt-10 flex justify-center sm:mt-12">
              <EmailNewsletter />
            </div>
          </div>
        </Section>
      </div>
    </Wrapper>
  )
}

export default HomePage
