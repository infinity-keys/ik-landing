import { useCallback } from 'react'

import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

import PuzzleDumb from 'src/components/PuzzleDumb/PuzzleDumb'
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

      <div className="slice--top relative z-0 flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black opacity-40" />

        <Particles
          id="tsparticles-hero"
          className="absolute top-0 left-0 z-0 h-full w-full"
          options={heroStars}
          init={particlesInit}
        />

        <div className="relative z-10">
          <Section largePadding={false}>
            <PuzzleDumb answer="unlock" />
          </Section>
        </div>
      </div>
    </Wrapper>
  )
}

export default HomePage
