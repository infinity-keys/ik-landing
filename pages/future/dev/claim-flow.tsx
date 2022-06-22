import { NextPage } from "next";
import Head from "next/head";
import Avatar from "boring-avatars";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import { useState } from "react";

const ClaimFlow: NextPage = () => {
  const [provider, setProvider] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [minted, setMinted] = useState(false);

  const mint = (network: String) => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      console.log("minting on " + network);
      setMinted(true);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const buttonClasses =
    "text-sm text-turquoise border-solid border-2 border-turquoise bg-transparent font-bold bg-turquoise hover:bg-turquoiseDark hover:text-blue rounded-md py-2 px-4 mt-6";

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mt-6";

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>
      <div className="scanlines">
        <Header />

        <div className="radial-bg min-h-screen flex items-center">
          <div className="container p-4 text-center">
            <div className="flex flex-col items-center">
              <Avatar
                size={128}
                name="nftz"
                variant="marble"
                colors={["#101D42", "#E400FF", "#3FCCBB", "#8500AC", "#303B5B"]}
              />
              <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
                {isLoading
                  ? "Minting Trophy"
                  : minted
                  ? "Your Trophy Is Minted"
                  : "Mint Your Trophy"}
              </h2>

              {!provider && (
                <button
                  className={buttonPrimaryClasses}
                  type="submit"
                  value="Join the mailing list"
                  onClick={() => setProvider("ethereum")}
                >
                  Connect Wallet
                </button>
              )}

              {!isLoading && provider && !minted && (
                <>
                  <button
                    className={
                      provider === "ethereum"
                        ? buttonPrimaryClasses
                        : buttonClasses
                    }
                    type="submit"
                    value="Join the mailing list"
                    onClick={() => {
                      if (provider === "ethereum") {
                        mint("ethereum");
                      } else {
                        setProvider("ethereum");
                      }
                    }}
                  >
                    {provider === "ethereum"
                      ? "Mint on Ethereum"
                      : "Switch to Ethereum"}
                  </button>
                  <button
                    className={
                      provider === "avalanche"
                        ? buttonPrimaryClasses
                        : buttonClasses
                    }
                    type="submit"
                    value="Join the mailing list"
                    onClick={() => {
                      if (provider === "avalanche") {
                        mint("avalanche");
                      } else {
                        setProvider("avalanche");
                      }
                    }}
                  >
                    {provider === "avalanche"
                      ? "Mint on Avalanche"
                      : "Switch to Avalanche"}
                  </button>
                </>
              )}

              {isLoading && (
                <div className="loader mx-auto mt-10">
                  <div className="ball-clip-rotate-multiple">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {minted && (
                <a href="#" className={buttonPrimaryClasses}>
                  View On {provider === "ethereum" ? "OpenSea" : "JoePegs"}
                </a>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;
