import { NextPage } from "next";
import Head from "next/head";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";

const ClaimFlow: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>
      <div className="scanlines">
        <Header />

        <div className="radial-bg min-h-screen flex items-center">
          <div className="container p-4 text-center">
            <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
              Claim Flow Demo
            </h2>
          </div>
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;
