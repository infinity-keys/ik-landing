// import Alert from 'src/components/Alert/Alert'
import { useCallback } from 'react'

import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

import Button from 'src/components/Button/Button'
import EmailNewsletter from 'src/components/EmailNewsletter/EmailNewsletter'
import EmailPartner from 'src/components/EmailPartner/EmailPartner'
import Flicker from 'src/components/Flicker/Flicker'
import Heading from 'src/components/Heading/Heading'
import Puzzle from 'src/components/PuzzleOriginal/Puzzle'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import Wrapper from 'src/components/Wrapper/Wrapper'
import { Link, routes } from '@redwoodjs/router'
import { heroStars } from 'src/lib/animations/hero-stars'

import '@infinity-keys/react-lens-share-button/dist/style.css'

/*
@TODO:
  Puzzle
*/

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

      <div className="slice--top radial-bg relative z-0 flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
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

      {/* About */}
      <div className="w-full bg-blue-800">
        <Section>
          <div className="mx-auto max-w-md sm:max-w-2xl">
            <Heading as="h1" visual="l">
              <span className="block">What is</span>
              <span className="block text-turquoise">Infinity Keys?</span>
            </Heading>
            <Text>
              Everyone should be able to use games and rewards to encourage others to complete tasks.
            </Text>
            <Text>
              Infinity Keys was created to provide these tools and help creators build game experiences for their communities. The platform allows anyone to create game experiences that require players to solve puzzles, watch video content, complete real-world objectives, or collect digital items.
            </Text>
            <Text>
              Build your own adventure.
            </Text>
            <ul className="list-disc mt-6 ml-6 space-y-4 md:space-y-0 text-indigo-200">
              <li>Gamified community education</li>
              <li>Proof-of-spin Music NFT mining</li>
              <li>Cross-community competitions</li>
              <li>Anti-sybil whitelisting</li>
              <li>Proof-of-play for gaming rewards</li>
              <li>Physical location check-in</li>
              <li>Silly fun</li>
              <li>Incentivized testnet tracking (coming soon)</li>
              <li>Social sharing games (coming soon)</li>
            </ul>
          </div>
        </Section>
      </div>

      {/* Build Section: we want a link to this in Header.tsx */}
      <Section className="mx-auto max-w-md my-20 sm:max-w-2xl" id="build">
        <div>
          <Heading>Build Your Own Gamified Treasure Hunts</Heading>
          <Text>
            Use Infinity Keys to create incentivized games for any community.
            Build experiences with the IK no-code platform:
          </Text>
            <ul className="text-indigo-200 list-disc m-6 space-y-4 md:space-y-0">
              <li>Embeddable videos, images, or games</li>
              <li>Secret passcodes</li>
              <li>Gated access using digital collectibles</li>
            </ul>
          <div className="flicker-container mt-4 text-2xl">
            <Link to={routes.packs()}>
              <Flicker delay=".6s">See Demo Games</Flicker>
            </Link>
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <EmailPartner />
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
