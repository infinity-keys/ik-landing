import Fade from 'src/components/Animations/Fade'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import beaker from 'src/images/beaker.webp'
import circle from 'src/images/Big-Circle.webp'
import medal from 'src/images/medal.webp'
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
]

const HomePage = () => {
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
                  is a no-code creator platform for games, collectors, and
                  digital keys
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

      <Section>
        <div className="mx-auto max-w-5xl">
          <h2 className="pl-2 pb-10 text-3xl font-semibold lg:text-5xl">
            How It Works
          </h2>
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center lg:gap-6">
            {benefits.map((data, index) => (
              <BenefitCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

export default HomePage
