import { PropsWithChildren, useState } from 'react'

import { LensIcon } from '@infinity-keys/react-lens-share-button'
import clsx from 'clsx'
import { m as motion, Variants } from 'framer-motion'

import { Link, routes } from '@redwoodjs/router'

import Fade from 'src/components/Animations/Fade'
import Scale from 'src/components/Animations/Scale'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Button from 'src/components/Button'
import HomeContactForm from 'src/components/HomeContactForm/HomeContactForm'
import OpportunityCard from 'src/components/OpportunityCard/OpportunityCard'
import Seo from 'src/components/Seo/Seo'
import beaker from 'src/images/beaker.webp'
import circle from 'src/images/Big-Circle.webp'
import computer from 'src/images/computer.webp'
import controller from 'src/images/controller.webp'
import heroBeaker from 'src/images/hero-beaker.webp'
import heroMedal from 'src/images/hero-medal.webp'
import heroWatch from 'src/images/hero-watch.webp'
import medal from 'src/images/medal.webp'
import puzzle from 'src/images/puzzle.webp'
import watch from 'src/images/watch.webp'
import DiscordIcon from 'src/svgs/DiscordIcon'
import RedditIcon from 'src/svgs/RedditIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

import '@infinity-keys/react-lens-share-button/dist/style.css'
import Section from 'src/components/Section/Section'

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

const socialLinks = [
  {
    href: 'https://lenster.xyz/u/infinitykeys',
    testing: 'lens',
    ariaLabel: 'visit IK Lenster.',
    icon: <LensIcon height={32} width={32} />,
  },
  {
    href: 'https://twitter.com/InfinityKeys',
    testing: 'twitter',
    ariaLabel: 'visit IK Twitter.',
    icon: <TwitterIcon />,
  },
  {
    href: 'https://discord.com/invite/infinitykeys',
    testing: 'discord',
    ariaLabel: 'visit IK Discord.',
    icon: <DiscordIcon />,
  },
  {
    href: 'https://www.reddit.com/r/infinitykeys/',
    testing: 'reddit',
    ariaLabel: 'visit the IK subreddit.',
    icon: <RedditIcon />,
  },
]

const heroData: Array<{
  image: string
  title: string
  description: string
}> = [
  {
    image: heroWatch,
    title: 'Players',
    description: 'Solve puzzles, collect keys & claim treasure',
  },
  {
    image: heroBeaker,
    title: 'Creators',
    description: 'Launch no-code keyhunts featuring any digital assets',
  },
  {
    image: heroMedal,
    title: 'Sponsors',
    description: 'Post bounties to incentivize creator-built games',
  },
]

const transition = {
  originY: 0.6,
  transition: {
    ease: [0.185, -0.01, 0, 1],
    duration: 1,
  },
}

const variants: Variants = {
  show: {
    scale: 1,
    ...transition,
  },
  hide: {
    scale: 0.6,
    ...transition,
  },
}

const Container = ({
  pySm = false,
  bgLight = false,
  children,
}: PropsWithChildren & {
  pySm?: boolean
  bgLight?: boolean
}) => {
  return (
    <div className={clsx('px-4 lg:px-12', { 'bg-white/5': bgLight })}>
      <div
        className={clsx(
          'mx-auto max-w-xs md:max-w-8xl',
          pySm ? 'py-8 lg:py-20' : 'py-14 lg:py-24'
        )}
      >
        {children}
      </div>
    </div>
  )
}

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [heroDataIndex, setHeroDataIndex] = useState<number | null>(null)
  const isSelected = typeof heroDataIndex === 'number'

  return (
    <div>
      <Seo title="Home" />

      <div className="relative mx-auto max-w-8xl overflow-hidden pb-16">
        <div className="min-h-screen">
          <Section>
            <div className="relative z-20 mt-16 max-w-2xl">
              <h1 className="text-shadow-lg text-3xl font-semibold lg:text-8xl">
                <Fade inline duration={1.8} key={heroDataIndex}>
                  {isSelected ? heroData[heroDataIndex].title : 'Infinity Keys'}
                </Fade>
              </h1>
              <Fade delay={isSelected ? 0.4 : 0.8} key={heroDataIndex}>
                <p
                  className="text-shadow-lg mt-4 max-w-xs text-2xl lg:max-w-lg lg:text-4xl"
                  data-cy="description"
                >
                  {isSelected
                    ? heroData[heroDataIndex].description
                    : 'is a no-code creator platform for games & collecting digital keys'}
                </p>
              </Fade>
            </div>
          </Section>
        </div>

        <div className="absolute bottom-24 -left-8 -right-8 z-10 mx-auto max-w-2xl lg:right-4 lg:top-32 lg:bottom-auto lg:left-auto lg:max-w-none">
          <motion.img
            src={circle}
            alt=""
            className="pointer-events-none block max-h-[calc(90vh)]"
            variants={variants}
            animate={isSelected ? 'hide' : 'show'}
          />

          {!isSelected && (
            <>
              <div className="group absolute top-[36%] left-[13%] w-24 max-w-[20vh] md:w-36 lg:w-48">
                <Fade>
                  <button onClick={() => setHeroDataIndex(2)}>
                    <img
                      src={medal}
                      alt=""
                      className="pointer-events-none transition-transform duration-500 ease-in-out group-hover:scale-90 "
                    />
                  </button>
                </Fade>
              </div>

              <div className="group absolute top-[20%] right-[14%] w-24 max-w-[20vh] md:w-36 lg:w-48">
                <Fade delay={0.3}>
                  <button onClick={() => setHeroDataIndex(0)}>
                    <img
                      src={watch}
                      alt=""
                      className="pointer-events-none transition-transform duration-500 ease-in-out group-hover:scale-90"
                    />
                  </button>
                </Fade>
              </div>

              <div className="group absolute bottom-[12%] left-[46%] w-24 max-w-[20vh] md:w-36 lg:w-48">
                <Fade delay={0.6}>
                  <button onClick={() => setHeroDataIndex(1)}>
                    <img
                      src={beaker}
                      alt=""
                      className="pointer-events-none transition-transform duration-500 ease-in-out group-hover:scale-90"
                    />
                  </button>
                </Fade>
              </div>
            </>
          )}

          {typeof heroDataIndex === 'number' && (
            <div className="absolute bottom-1/2 w-full translate-y-[58%] text-center">
              <button
                onClick={() => setHeroDataIndex(null)}
                className="w-[60%]"
              >
                <Fade inline>
                  <span
                    className={clsx(
                      'block',
                      heroData[heroDataIndex].title !== 'Players' && 'hidden'
                    )}
                  >
                    <Scale withHover inline scaleInitial={0.9}>
                      <img
                        src={heroData[heroDataIndex].image}
                        alt=""
                        className="pointer-events-none w-full max-w-[150px] sm:max-w-[170px] lg:max-h-[60vh] lg:max-w-[270px] "
                      />
                    </Scale>
                  </span>

                  <span
                    className={clsx(
                      'block',
                      heroData[heroDataIndex].title !== 'Sponsors' && 'hidden'
                    )}
                  >
                    <Scale withHover inline scaleInitial={0.9}>
                      <img
                        src={heroData[heroDataIndex].image}
                        alt=""
                        className="pointer-events-none w-full max-w-md lg:max-h-[50vh] lg:max-w-xl"
                      />
                    </Scale>
                  </span>

                  <span
                    className={clsx(
                      'block',
                      heroData[heroDataIndex].title !== 'Creators' && 'hidden'
                    )}
                  >
                    <Scale withHover inline scaleInitial={0.9}>
                      <img
                        src={heroData[heroDataIndex].image}
                        alt=""
                        className="pointer-events-none w-full max-w-[170px] sm:max-w-[220px] lg:max-h-[65vh] lg:max-w-xs"
                      />
                    </Scale>
                  </span>
                </Fade>
              </button>
            </div>
          )}
        </div>
      </div>

      <section>
        <Container pySm>
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
        </Container>

        <Container bgLight>
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between lg:gap-6">
            {benefits.map((data, index) => (
              <BenefitCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container pySm>
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
        </Container>

        <Container bgLight>
          <div className="flex flex-col items-center gap-20 md:flex-row md:items-stretch md:justify-between md:gap-6">
            {opportunity.map((data, index) => (
              <OpportunityCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container pySm>
          <Fade>
            <h2 className="text-3xl font-semibold lg:text-5xl">
              There&apos;s treasure everywhere.
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
        </Container>

        {isFormVisible && (
          <Container bgLight>
            <div className="mx-auto flex min-h-[542px] max-w-2xl items-center justify-center lg:min-h-[354px]">
              <HomeContactForm />
            </div>
          </Container>
        )}
      </section>

      <footer className="bg-white/5 px-4 py-16">
        <div className="">
          <div className="mb-4 flex justify-center gap-4">
            <Link
              to={routes.play()}
              className="text-xl transition-colors hover:text-stone-400"
            >
              Play
            </Link>
            <a
              href="https://docs.infinitykeys.io"
              className="text-xl transition-colors hover:text-stone-400"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </div>
          <div className="flex justify-center gap-8">
            {socialLinks.map(({ href, testing, ariaLabel, icon }) => (
              <a
                key={href}
                className="text-white/40 transition-colors hover:text-brand-accent-primary"
                data-cy={testing}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={ariaLabel}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
