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
import { useState } from "react";

interface PageParams {
  email: string;
  userId: string;
  jwt: string;
}

interface Data {
  query: PageParams;
}

const DeleteUserPage: NextPage<PageParams> = ({ email, userId, jwt }) => {
  const [message, setMessage] = useState("");

  const handleClick = async ({ userId, email, jwt }) => {
    try {
      await deleteUser({ userId, email, jwt });
      setMessage("Your info has been deleted. Thank you for playing!");
    } catch (e) {
      setMessage("Something went wrong with your request");
    }
  };

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
          <Heading small>Delete My Info</Heading>
        </div>
        {message && <Text>{message}</Text>}
        <Text>
          This will remove you from the database completely. All progress
          related your completed puzzles and NFTs will be lost.
        </Text>
        <div className="mt-7">
          <Button
            onClick={() => handleClick({ userId, email, jwt })}
            text="Delete Me"
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default DeleteUserPage;

export const getServerSideProps = async ({ query }: Data) => {
  const { email, userId, jwt } = query;
  const url = await generateUserDeleteUrl(userId, email);
  return {
    props: {
      email,
      userId,
      jwt,
    },
  };
};
