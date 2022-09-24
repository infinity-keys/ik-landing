import { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { deleteUser } from "@lib/fetchers";

import Wrapper from "@components/wrapper";
import Button from "@components/button";
import Text from "@components/text";
import Heading from "@components/heading";
import Alert from "@components/alert";

interface PageParams {
  jwt: string;
}

interface Data {
  query: PageParams;
}

const DeleteUserPage: NextPage<PageParams> = ({ jwt }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleClick = async (jwt: string) => {
    try {
      const res = await deleteUser(jwt);
      if (!res.ok) {
        throw Error;
      }
      setIsError(false);
      setSuccessMessage("Your info has been deleted. Thank you for playing!");
    } catch (e) {
      setIsError(true);
      setSuccessMessage("");
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>Remove My Data</title>
      </Head>

      <div className="text-center max-w-2xl">
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
          </a>
        </Link>

        {successMessage && (
          <>
            <div className="mb-4">
              <Text>{successMessage}</Text>
            </div>
            <Button href="/" text="Return Home" />
          </>
        )}

        {!successMessage && (
          <>
            <div className="mt-7">
              <Heading small>Remove My Data</Heading>
            </div>
            <Text>
              This will remove you from the database completely. All progress
              related your completed puzzles and NFTs will be lost.
            </Text>
            <div className="mt-7">
              <Button
                onClick={() => handleClick(jwt)}
                text="Delete My Data"
                variant="warn"
              />
            </div>
          </>
        )}

        {isError && (
          <div className="flex justify-center mt-4">
            <Alert text="Something went wrong with your request. If this keeps happening, please contact us on our [Discord channel](https://discord.com/invite/infinitykeys)" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default DeleteUserPage;

export const getServerSideProps = async ({ query }: Data) => {
  const { jwt } = query;
  return {
    props: { jwt },
  };
};
