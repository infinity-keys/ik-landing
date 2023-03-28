// import Alert from 'src/components/Alert/Alert'
import { useCallback } from 'react'

import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

import Flicker from 'src/components/Flicker/Flicker'
import Heading from 'src/components/Heading/Heading'
import Puzzle from 'src/components/PuzzleOriginal/Puzzle'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'
import { heroStars } from 'src/lib/animations/hero-stars'

import '@infinity-keys/react-lens-share-button/dist/style.css'

const HomePage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Wrapper full radialBg={false}>
      <Seo title="Home" />

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

            <Puzzle answer="unlock" />

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
    </Wrapper>
  )
}

export default HomePage
