import { useEffect, useState } from 'react'

import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'

import { Link, routes } from '@redwoodjs/router'

const CookieConsentBanner = () => {
  const [cookies, setCookies] = useState(
    getCookieConsentValue('CookieConsent') === 'true'
  )

  useEffect(() => {
    if (cookies) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }
  }, [cookies])

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      enableDeclineButton
      declineButtonText="Decline"
      disableStyles
      containerClasses="backdrop-blur-md	border-t border-indigo-500 fixed bottom-0 w-full text-gray-100 p-4 bg-blue/60 md:flex justify-between items-center"
      buttonWrapperClasses="shrink-0"
      buttonClasses="text-sm font-bold px-4 py-2 rounded bg-turquoise text-blue mt-6 md:mt-0"
      declineButtonClasses="text-sm font-bold px-4 py-2 rounded bg-gray-200 mr-6 md:ml-6"
      onAccept={() => setCookies(true)}
      expires={150}
    >
      We use cookies to ensure that we give you the best experience on our
      website. Read our{' '}
      <Link to={routes.privacyPolicy()} className="text-turquoise underline">
        Privacy Policy
      </Link>
      .
    </CookieConsent>
  )
}

export default CookieConsentBanner
