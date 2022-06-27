import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Wrapper from "@components/wrapper";

const NotFoundPage: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="radial-bg scanlines min-h-screen flex items-center">
        <div className="container p-4 text-center">
          <Link href={"/"}>
            <a>
              <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
            </a>
          </Link>
          <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
            heck tackle crab (check back later)
          </h2>
        </div>
      </div>
    </Wrapper>
  );
};
export default NotFoundPage;
