import { PropsWithChildren, Suspense, useRef, useState, lazy } from 'react'

import { LensIcon } from '@infinity-keys/react-lens-share-button'
import clsx from 'clsx'
import { m as motion } from 'framer-motion'

import { Link, routes } from '@redwoodjs/router'

import Fade from 'src/components/Animations/Fade'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Button from 'src/components/Button'
import HomeContactForm from 'src/components/HomeContactForm/HomeContactForm'
import OpportunityCard from 'src/components/OpportunityCard/OpportunityCard'
import Seo from 'src/components/Seo/Seo'
import beaker from 'src/images/beaker.webp'
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

const Spline = lazy(() => import('@splinetool/react-spline'))

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

type HeroData = {
  image: string
  // These are the ids that come from the Spline objects
  id: string
  title: string
  description: string
}

type HeroDataKey = 'BEAKER' | 'COMPASS' | 'MEDAL'

const heroDataLookup: {
  [key in HeroDataKey]: HeroData
} = {
  BEAKER: {
    image: heroBeaker,
    id: 'a544d2c8-4724-4307-a7b6-02bc4e26af9c',
    title: 'Creators',
    description: 'Launch no-code keyhunts featuring any digital assets',
  },
  COMPASS: {
    image: heroWatch,
    id: 'd2785602-5804-46c5-be6d-8858a22eddcc',
    title: 'Players',
    description: 'Solve puzzles, collect keys & claim treasure',
  },
  MEDAL: {
    image: heroMedal,
    id: '08443abf-b225-42ac-bb7a-7a4e416cf4c3',
    title: 'Sponsors',
    description: 'Post bounties to incentivize creator-built games',
  },
}

const Container = ({
  pySm = false,
  bgLight = false,
  noXs = false,
  children,
}: PropsWithChildren & {
  pySm?: boolean
  bgLight?: boolean
  noXs?: boolean
}) => {
  return (
    <div className={clsx({ 'bg-white/5': bgLight })}>
      <div
        className={clsx(
          'mx-auto px-4 md:max-w-8xl lg:px-12',
          pySm ? 'py-8 lg:py-20' : 'py-14 lg:py-24',
          !noXs && 'max-w-xs'
        )}
      >
        {children}
      </div>
    </div>
  )
}

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [heroDataIndex, setHeroDataIndex] = useState<HeroDataKey | null>(null)
  const isSelected = heroDataIndex !== null
  const formRef = useRef<{ scrollToElement: () => void }>()

  const handleScrollToForm = () => {
    setIsFormVisible(true)
    if (formRef.current) {
      formRef.current.scrollToElement()
    }
  }

  function onMouseDown(targetId: string) {
    switch (targetId) {
      case heroDataLookup.BEAKER.id:
        setHeroDataIndex('BEAKER')
        break
      case heroDataLookup.COMPASS.id:
        setHeroDataIndex('COMPASS')
        break
      case heroDataLookup.MEDAL.id:
        setHeroDataIndex('MEDAL')
        break
      default:
        setHeroDataIndex(null)
    }
  }

  return (
    <div>
      <Seo title="Home" />

      <div className="relative mx-auto max-w-8xl overflow-hidden">
        <div className="min-h-screen">
          <Container noXs>
            <div className="flex flex-col md:flex-row">
              <div className="relative z-20 mt-12 max-w-2xl flex-1 md:mt-32">
                <div className="mx-auto max-w-xs px-4 md:max-w-none lg:px-0">
                  <h1 className="text-shadow-lg text-3xl font-semibold lg:text-6xl">
                    <Fade inline duration={1.8} key={heroDataIndex}>
                      {isSelected
                        ? heroDataLookup[heroDataIndex].title
                        : 'Infinity Keys'}
                    </Fade>
                  </h1>
                  <Fade delay={isSelected ? 0.4 : 0.6} key={heroDataIndex}>
                    <p
                      className="text-shadow-lg mt-4 min-h-[96px] max-w-xs text-2xl lg:max-w-lg lg:text-4xl"
                      data-cy="description"
                    >
                      {isSelected
                        ? heroDataLookup[heroDataIndex].description
                        : 'is a no-code creator platform for games & collecting digital keys'}
                    </p>
                  </Fade>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSelected ? 0 : 1 }}
                    transition={{
                      duration: isSelected ? 0.1 : 0.9,
                      delay: isSelected ? 0 : 0.9,
                    }}
                  >
                    <div className="mt-8 flex gap-2">
                      <Button
                        variant="rounded"
                        shadow={false}
                        onClick={handleScrollToForm}
                        text=""
                      >
                        <span className="hidden md:inline">Beta&nbsp;</span>
                        Waitlist
                      </Button>

                      <Button
                        variant="roundedWhite"
                        shadow={false}
                        text=""
                        to={routes.puzzleLanding({ slug: 'the-society' })}
                      >
                        <span className="hidden md:inline">Play&nbsp;</span>
                        Demo
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="relative mx-auto mt-8 aspect-square w-full max-w-xl flex-1">
                <Suspense>
                  <Spline
                    scene="https://prod.spline.design/PLAfCk5FVS07KdX2/scene.splinecode"
                    className="absolute inset-0"
                  />
                  <Spline
                    scene="https://prod.spline.design/ChhWrS5PwiyDUGhr/scene.splinecode"
                    className="absolute inset-0"
                    onMouseDown={(e) => onMouseDown(e.target.id)}
                  />
                </Suspense>
              </div>
            </div>
          </Container>
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
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center lg:gap-6">
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
                  shadow={false}
                  onClick={handleScrollToForm}
                />
              </div>
            )}
          </Fade>
        </Container>

        {isFormVisible && (
          <Container bgLight>
            <div className="mx-auto flex min-h-[542px] max-w-2xl items-center justify-center lg:min-h-[354px]">
              <HomeContactForm ref={formRef} />
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
