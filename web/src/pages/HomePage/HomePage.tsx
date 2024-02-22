import { PropsWithChildren, useLayoutEffect, useRef } from 'react'

import clsx from 'clsx'

import { Link, routes, useLocation } from '@redwoodjs/router'

import Fade from 'src/components/Animations/Fade'
import Button from 'src/components/Button'
import HomeContactForm from 'src/components/HomeContactForm/HomeContactForm'
import Seo from 'src/components/Seo/Seo'
import heroLogo from 'src/images/full-logo-2x.webp'
import heroLogoLg from 'src/images/full-logo-lg.webp'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

import '@infinity-keys/react-lens-share-button/dist/style.css'

const socialLinks = [
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
]

const Container = ({
  pySm = false,
  noPx = false,
  noPt = false,
  bgLight = false,
  children,
}: PropsWithChildren & {
  pySm?: boolean
  bgLight?: boolean
  noPx?: boolean
  noPt?: boolean
}) => {
  return (
    <div className={clsx({ 'bg-white/5': bgLight })}>
      <div
        className={clsx(
          'mx-auto max-w-xs md:max-w-8xl',
          // pySm ? 'py-8 lg:py-20' : 'py-14 lg:py-24',
          !noPx && 'px-4 lg:px-12',
          {
            'py-8 lg:py-20': pySm && !noPt,
            'py-14 lg:py-24': !pySm && !noPt,
            'pb-14 lg:pb-24': noPt,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}

const HomePage = () => {
  const formRef = useRef<{ scrollToElement: () => void }>()
  const workRef = useRef<HTMLElement>(null)
  const { hash } = useLocation()

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollToElement()
    }
  }

  useLayoutEffect(() => {
    if (hash === '#works' && workRef.current) {
      // Wait for mobile nav to remove `overflow: hidden` from html tag
      // before scrolling to element
      const timeout = setTimeout(() => {
        workRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 300)

      return () => clearTimeout(timeout)
    }

    if (hash === '#waitlist') {
      handleScrollToForm()
    }
  }, [hash])

  return (
    <div>
      <Seo title="Home" />

      <div className="relative mx-auto flex max-w-8xl flex-col items-center overflow-x-hidden pt-20 md:mt-0 md:min-h-screen md:flex-row md:justify-between">
        <Container noPx pySm>
          <div className="relative z-10 max-w-xs pr-4 pl-4 md:pr-0 lg:max-w-xl lg:pl-12">
            <h1 className="text-shadow-lg text-3xl font-semibold lg:text-5xl xl:text-6xl">
              <Fade inline duration={1.2}>
                <span data-cy="description">There&apos;s treasure</span>
              </Fade>
              <Fade inline delay={0.6} duration={1.2}>
                <span className="text-brand-accent-primary">everywhere</span>
              </Fade>
            </h1>

            <Fade delay={1.2}>
              <div className="mt-8 flex gap-2">
                <Button round solid onClick={handleScrollToForm}>
                  <span className="hidden md:inline">Join&nbsp;</span>
                  Waitlist
                </Button>

                <Button
                  round
                  to={routes.puzzleLanding({ slug: 'the-society' })}
                >
                  <span className="hidden md:inline">Play&nbsp;</span>
                  Demo
                </Button>
              </div>
            </Fade>
          </div>
        </Container>

        <div className="relative z-0 w-full md:max-w-xl lg:-mt-20 lg:max-w-3xl xl:max-w-4xl">
          <Fade delay={0.9}>
            <picture>
              <source srcSet={`${heroLogo} 1x, ${heroLogoLg} 2x`} />
              <img
                src={heroLogo}
                alt="Infinity Keys logo of a spooky eye in triangle."
                className="block w-full"
              />
            </picture>
          </Fade>
        </div>
      </div>

      <section>
        <Container bgLight>
          <div className="flex items-center justify-center">
            <HomeContactForm ref={formRef} />
          </div>
        </Container>
      </section>

      <footer className="bg-white/5 px-4 py-16">
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
        <div>
          <p className="mt-8 text-center text-base text-white/50">
            &copy; 2022 - {new Date().getFullYear()} Infinity Keys. All rights
            reserved. |{' '}
            <Link
              to={routes.privacyPolicy()}
              className="inline-block underline transition hover:text-brand-accent-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
