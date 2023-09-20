import Fade from 'src/components/Animations/Fade'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'
import beaker from 'src/images/beaker.webp'
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
      <Section>
        <div className="min-h-screen">
          <h1 className="text-center text-5xl font-semibold">
            <Fade inline duration={1.2}>
              There&apos;s treasure
            </Fade>{' '}
            <Fade inline duration={1.2} delay={0.8} x={-5}>
              everywhere.
            </Fade>
          </h1>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl">
          <h2 className="pl-2 pb-10 text-3xl font-semibold">How It Works</h2>
          <div className="flex justify-center gap-6">
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
