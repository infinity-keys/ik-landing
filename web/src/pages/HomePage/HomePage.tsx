import Fade from 'src/components/Animations/Fade'
import Section from 'src/components/Section/Section'
import Seo from 'src/components/Seo/Seo'

import '@infinity-keys/react-lens-share-button/dist/style.css'

const HomePage = () => {
  return (
    <div>
      <Seo title="Home" />
      <Section>
        <h1 className="text-center text-5xl font-semibold">
          <Fade inline duration={1.2}>
            There&apos;s treasure
          </Fade>{' '}
          <Fade inline duration={1.2} delay={0.8} x={-5}>
            everywhere.
          </Fade>
        </h1>
      </Section>
    </div>
  )
}

export default HomePage
