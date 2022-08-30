import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { deleteUser } from "@lib/fetchers";

import Wrapper from "@components/wrapper";
import Button from "@components/button";
import Text from "@components/text";
import Heading from "@components/heading";
import { generateUserDeleteUrl } from "@lib/utils";
import { useEffect } from "react";

interface PageParams {
  email: string;
  uid: string;
  temp: string;
}

interface Data {
  query: PageParams;
}

const DeleteUserPage: NextPage<PageParams> = ({ email, uid, temp }) => {
  useEffect(() => {
    console.log(temp);
  }, [temp]);

  return (
    <Wrapper>
      <Head>
        <title>Remove Me</title>
      </Head>

      <div className="text-center max-w-2xl">
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
          </a>
        </Link>
        <div className="mt-7">
          <Heading small>Delete my info</Heading>
        </div>
        <Text>
          This will remove you from the database completely. All progress
          related your completed puzzles and NFTs will be lost.
        </Text>
        <div className="mt-7">
          <Button onClick={() => deleteUser({ uid, email })} text="Delete Me" />
        </div>
      </div>
    </Wrapper>
  );
};
export default DeleteUserPage;

export const getServerSideProps = async ({ query }: Data) => {
  const { email, uid } = query;

  const deleteUserApiUrl = await generateUserDeleteUrl(uid, email);
  return {
    props: {
      email,
      uid,
      temp: deleteUserApiUrl.toString(),
    },
  };
};
