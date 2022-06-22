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
              {!provider ? (
                <>
                  <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
                    Mint Your Trophy
                  </h2>
                  <button
                    className="text-sm text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 my-6"
                    type="submit"
                    value="Join the mailing list"
                    onClick={() => setProvider("ethereum")}
                  >
                    connect wallet
                  </button>
                </>
              ) : isLoading ? (
                <div className="loader mx-auto mt-10">
                  <div className="ball-clip-rotate-multiple">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : minted ? (
                <>
                  <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
                    Your Trophy Is Minted
                  </h2>
                  <a
                    href="#"
                    className="text-sm text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 my-6"
                  >
                    View On {provider === "ethereum" ? "OpenSea" : "JoePegs"}
                  </a>
                </>
              ) : (
                <>
                  <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
                    Mint Your Trophy
                  </h2>
                  <button
                    className="text-sm text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 my-6"
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
                      ? "mint on ethereum"
                      : "switch to ethereum"}
                  </button>
                  <button
                    className="text-sm text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
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
                      ? "mint on avalanche"
                      : "switch to avalanche"}
                  </button>
                </>
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
