// import Alert from 'src/components/Alert/Alert'
import { useCallback } from 'react'

import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

import Button from 'src/components/Button/Button'
import CheckNftCell from 'src/components/CheckNftCell'
import CloudImage from 'src/components/CloudImage/CloudImage'
import EmailNewsletter from 'src/components/EmailNewsletter/EmailNewsletter'
import EmailPartner from 'src/components/EmailPartner/EmailPartner'
import Flicker from 'src/components/Flicker/Flicker'
import Heading from 'src/components/Heading/Heading'
import Puzzle from 'src/components/PuzzleOriginal/Puzzle'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import Wrapper from 'src/components/Wrapper/Wrapper'
import { heroStars } from 'src/lib/animations/hero-stars'

import '@infinity-keys/react-lens-share-button/dist/style.css'

/*
@TODO:
  Puzzle
*/
export const logoinfo = [
  {
    href: 'https://www.infinitykeys.io/pack/lens-bogota-pack',
    id: 'website-assets/lens-logo_ducu7a',
    name: 'Lens',
    alt: 'Lens Logo',
  },
  {
    href: 'https://www.infinitykeys.io/pack/saga-wormhole-pack',
    id: 'website-assets/saga_logo_ifk2az',
    name: 'Saga',
    alt: 'Saga Logo',
  },
  {
    href: 'https://www.infinitykeys.io/pack/san-creator-pack',
    id: 'website-assets/san_logo_dijhbm',
    name: 'San',
    alt: 'San Logo',
  },
  {
    href: 'https://www.infinitykeys.io/pack/p0-pack',
    id: 'website-assets/pn_symbol_clean_lcvuu6',
    name: 'Probably Nothing',
    alt: 'PN Logo',
  },
  {
    href: 'https://www.infinitykeys.io/puzzle/finkel-islanders',
    id: 'website-assets/finkel_logo_nriuwc',
    name: 'Finkel',
    alt: 'Finkel Logo',
  },
  {
    href: 'https://www.infinitykeys.io/puzzle/second-season-rehash',
    id: 'website-assets/rehash_logo_zwqhhw',
    name: 'Rehash',
    alt: 'Rehash Logo',
  },
]

const HomePage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const SuccessComponent = () => (
    <div
      data-cy="success_message_check"
      className="container my-16 flex max-w-[12rem] justify-center"
    >
      <Button text="Play More" fullWidth to={'/packs'} />
    </div>
  )

  return (
    <Wrapper full radialBg={false}>
      <Seo />

      <div className="slice--top radial-bg relative z-0 flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black opacity-40" />

        <Particles
          id="tsparticles-hero"
          className="absolute top-0 left-0 z-0 h-full w-full"
          options={heroStars}
          init={particlesInit}
        />

        <div className="relative z-10">
          <Section largePadding={false}>
            <div className="mb-8 text-center md:mb-12">
              <Heading as="h1" visual="l">
                This is an Infinity Keys h
                <Flicker once bold delay=".3s">
                  un
                </Flicker>
                t.
              </Heading>
            </div>

            <Puzzle
              puzzleId={'puzzleId'}
              count={6}
              SuccessComponent={SuccessComponent}
              forwardOnFail={false}
            />
            <div className="flicker-container mt-10 text-center text-white sm:text-xl md:text-2xl">
              <p className="leading-normal">
                Find the c<Flicker delay=".6s">l</Flicker>
                ues and enter the key.
              </p>
              <p className="leading-normal">
                Hunt f<Flicker delay=".8s">o</Flicker>r{' '}
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

      <CheckNftCell
        account="0x2B7952c3F442Eb8BaA069f90bF692Facb52890a9"
        // poapEventId="42940"
        chainId={1}
        tokenId={1}
      />

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
              {logoinfo.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noopener nonreferrer noreferrer"
                >
                  <CloudImage
                    id={item.id}
                    alt={item.alt}
                    width={150}
                    height={150}
                  />
                </a>
              ))}
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
