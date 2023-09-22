import { useState } from 'react'

import Fade from 'src/components/Animations/Fade'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Button from 'src/components/Button'
import HomeContactForm from 'src/components/HomeContactForm/HomeContactForm'
import OpportunityCard from 'src/components/OpportunityCard/OpportunityCard'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import beaker from 'src/images/beaker.webp'
import circle from 'src/images/Big-Circle.webp'
import computer from 'src/images/computer.webp'
import controller from 'src/images/controller.webp'
import medal from 'src/images/medal.webp'
import puzzle from 'src/images/puzzle.webp'
import watch from 'src/images/watch.webp'

import '@infinity-keys/react-lens-share-button/dist/style.css'

export type BenefitCardProps = {
  icon: string
  title: string
  description: string
  list: string[]
}

const benefits: Array<BenefitCardProps> = [
  {
    icon: watch,
    title: 'Players',
    description:
      'Seek adventure and collect artifacts in creator-built keyhunt puzzle games.',
    list: [
      'Collect addictive digital keys',
      'Conquer the leaderboards',
      'Display achievements',
      'Learn new skills',
      'Explore new worlds',
    ],
  },
  {
    icon: beaker,
    title: 'Creators',
    description:
      'Use no-code keyhunt tools to take players on your creative adventures.',
    list: [
      'Create-to-earn incentives',
      'No-code game construction',
      'Use any digital asset',
      'Customize story and art',
      'Game discovery engine',
    ],
  },
  {
    icon: medal,
    title: 'Sponsors',
    description:
      'Independent creators build keyhunt puzzle games featuring your collections.',
    list: [
      'Retroactive NFT Utility ',
      '(re)Engage communities ',
      'Offset creator incentive costs ',
      'Decentralized content ',
      'User discovery engine',
    ],
  },
]

export type OpportunityCardProps = {
  image: string
  title: string
  description: string
}

const opportunity: Array<OpportunityCardProps> = [
  {
    image: computer,
    title: '$231B',
    description: 'Expected NFT space market cap in 2030',
  },
  {
    image: controller,
    title: '$133B',
    description: 'Expected web3 gaming sector market cap in 2033',
  },
  {
    image: puzzle,
    title: '$2B',
    description: 'Retroactive NFT utility at low 2023 values',
  },
]

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  return (
    <div>
      <Seo title="Home" />

      <div className="relative mx-auto max-w-[1440px] overflow-hidden pb-16">
        <div className="min-h-screen">
          <Section>
            <div className="relative z-20 mt-16 max-w-2xl">
              <h1 className="text-shadow-lg text-3xl font-semibold lg:text-8xl">
                <Fade inline duration={1.8}>
                  Infinity Keys
                </Fade>
              </h1>
              <Fade delay={0.8}>
                <p
                  className="text-shadow-lg mt-4 max-w-lg text-2xl lg:text-4xl"
                  data-cy="description"
                >
                  is a no-code creator platform for games & collecting digital
                  keys
                </p>
              </Fade>
            </div>
          </Section>
        </div>

        <div className="absolute top-1/3 -left-8 -right-8 z-10 mx-auto max-w-2xl lg:right-4 lg:top-32 lg:bottom-auto lg:left-auto lg:max-w-none">
          <img src={circle} alt="" className="pointer-events-none block" />

          <div className="group absolute top-[36%] left-[13%] w-24 md:w-36 lg:w-48">
            <Fade>
              <img
                src={medal}
                alt=""
                className="transition-transform ease-in-out group-hover:scale-90"
              />
            </Fade>
          </div>

          <div className="group absolute top-[20%] right-[14%] w-24 md:w-36 lg:w-48">
            <Fade delay={0.3}>
              <img
                src={watch}
                alt=""
                className="transition-transform ease-in-out group-hover:scale-90"
              />
            </Fade>
          </div>
          <div className="group absolute bottom-[12%] left-[46%] w-24 md:w-36 lg:w-48">
            <Fade delay={0.6}>
              <img
                src={beaker}
                alt=""
                className="transition-transform ease-in-out group-hover:scale-90"
              />
            </Fade>
          </div>
        </div>
      </div>

      <section className="pt-8 md:pt-20">
        <div className="px-4">
          <div className="mx-auto max-w-xs pb-8 md:max-w-5xl lg:px-8 lg:pb-20">
            <Fade>
              <h2 className="pb-12 text-3xl font-semibold lg:text-5xl">
                How It Works
              </h2>
            </Fade>
            <Fade>
              <p className="max-w-xl text-sm lg:text-lg">
                A net positive value loop incentives creators, sponsors, and
                players without draining economic value from the system
              </p>
            </Fade>
          </div>
        </div>

        <div className="bg-white/5 py-14 lg:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 md:flex-row md:justify-center lg:gap-6 lg:px-8">
            {benefits.map((data, index) => (
              <BenefitCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 md:pt-20">
        <div className="px-4">
          <div className="mx-auto max-w-xs pb-8 md:max-w-5xl lg:px-8 lg:pb-20">
            <Fade>
              <h2 className="pb-12 text-3xl font-semibold lg:text-5xl">
                Opportunity
              </h2>
            </Fade>
            <Fade>
              <p className="max-w-xl text-sm lg:text-lg">
                Infinity Keys taps into the UCG and web3 gaming sectors giving
                projects and creators more attention and audience
              </p>
            </Fade>
          </div>
        </div>

        <div className="bg-white/5 py-14 lg:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-20 px-4 md:flex-row md:justify-center md:gap-6 lg:px-8">
            {opportunity.map((data, index) => (
              <OpportunityCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 md:pt-20">
        <div className="px-4">
          <div className="mx-auto max-w-xs pb-8 md:max-w-5xl lg:px-8 lg:pb-20">
            <Fade>
              <h2 className="text-3xl font-semibold lg:text-5xl">
                There&apos;s treasure everywhere
              </h2>
            </Fade>

            <Fade>
              {!isFormVisible && (
                <div className="pt-12">
                  <Button
                    text="Get in Touch"
                    variant="rounded"
                    onClick={() => setIsFormVisible(true)}
                  />
                </div>
              )}
            </Fade>
          </div>
        </div>

        {isFormVisible && (
          <div className="bg-white/5 py-14 lg:py-24">
            <div className="mx-auto flex min-h-[542px] max-w-5xl items-center justify-center px-4 lg:min-h-[354px] lg:px-8">
              <HomeContactForm />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
