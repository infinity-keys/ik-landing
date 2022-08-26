import { NextPage } from "next";
import { useRouter } from "next/router";

import { deleteUser } from "@lib/fetchers";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Wrapper from "@components/wrapper";
import Button from "@components/button";

const DeleteUserPage: NextPage = () => {
  const { query } = useRouter();
  const { uid } = query;
  console.log("query: ", uid);

  return (
    <Wrapper>
      <Head>
        <title>Remove Me</title>
      </Head>

      <div className="text-center">
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
          </a>
        </Link>
        <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
          Delete my info
        </h2>
        <Button onClick={() => deleteUser({ uid })} text="Delete User" />
      </div>
    </Wrapper>
  );
};
export default DeleteUserPage;

export const getServerSideProps = async (context) => {
  return { props: { uid: context.params.uid } };
};
