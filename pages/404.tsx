import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import Wrapper from "@components/wrapper";
import Seo from "@components/seo";

const NotFoundPage: NextPage = () => {
  return (
    <Wrapper>
      <Seo title="404 - Page Not Found" />

      <div className="text-center">
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
          </a>
        </Link>
        <h2 className="mt-4 text-xl tracking-tight font-bold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
          heck tackle crab (check back later)
        </h2>
      </div>
    </Wrapper>
  );
};
export default NotFoundPage;