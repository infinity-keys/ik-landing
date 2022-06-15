import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Avatar from "boring-avatars";

// import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

import { gqlApiSdk } from "@lib/server";
import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import { routeLandingUrl } from "@lib/utils";
import Wrapper from "@components/wrapper";
import Header from "@components/header-nav";
import Footer from "@components/footer";

interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
}

const Puzzles: NextPage<PageProps> = ({ puzzles }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>
      <div className="radial-bg scanlines min-h-screen flex flex-col">
        <Header />

        <div className="container px-4 flex-1">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8"
          >
            {puzzles.map((puzzle) => (
              <li
                key={puzzle.puzzle_id}
                className="col-span-1 flex flex-col text-center bg-blue-800 rounded-lg shadow divide-y divide-gray-200 cursor-pointer"
              >
                <Link href={routeLandingUrl(puzzle.landing_route)}>
                  <div className="flex-1 flex flex-col p-8">
                    {/* <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" /> */}
                    <div className="w-32 h-32 flex-shrink-0 mx-auto">
                      <Avatar
                        size={128}
                        name={puzzle.puzzle_id}
                        variant="marble"
                        colors={[
                          "#101D42",
                          "#E400FF",
                          "#3FCCBB",
                          "#8500AC",
                          "#303B5B",
                        ]}
                      />
                    </div>
                    <h3 className="mt-6 text-gray-200 text-sm font-medium">
                      {puzzle.simple_name}
                    </h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      {/* @TOOD: put slugs here when the time comes */}
                      {/* <dd className="text-gray-500 text-sm">
                        {puzzle.puzzle_id}
                      </dd> */}
                      <dt className="sr-only">Character count</dt>
                      <dd className="mt-3">
                        <span className="px-2 py-1 text-green-800 text-xs font-medium">
                          <Image
                            src="/favicon-32x32.png"
                            alt="Infinity Keys logo"
                            width={32}
                            height={32}
                          />
                        </span>
                      </dd>
                    </dl>
                  </div>
                  {/* <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a
                        href={`mailto:${person.email}`}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Email</span>
                      </a>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                      <a
                        href={`tel:${person.telephone}`}
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Call</span>
                      </a>
                    </div>
                  </div>
                </div> */}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};
export default Puzzles;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PublicPuzzles();

  return {
    props: {
      puzzles,
    },
  };
}
