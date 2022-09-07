import { FC, useEffect, useState } from "react";
import Link from "next/link";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const CookieConsentBanner: FC = () => {
  const [cookies, setCookies] = useState(
    getCookieConsentValue("CookieConsent") === "true"
  );

  useEffect(() => {
    if (cookies) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  }, [cookies]);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      enableDeclineButton
      declineButtonText="Decline"
      declineButtonStyle={{
        background: "rgba(255,255,255,.4)",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "4px",
        padding: "8px 20px",
      }}
      style={{
        background: "rgba(7, 14, 31, .6)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgb(99 102 241)",
        alignItems: "center",
      }}
      buttonStyle={{
        background: "#5ffae7",
        color: "#101D42",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "4px",
        padding: "8px 20px",
      }}
      onAccept={() => setCookies(true)}
      expires={150}
    >
      We use cookies to ensure that we give you the best experience on our
      website. Read our{" "}
      <Link href="/privacy-policy">
        <a className="text-turquoise underline">Privacy Policy</a>
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner;
