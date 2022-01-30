import type { NextPage } from "next";
import Head from "next/head";

const Gated: NextPage = () => {
  return (
    <div className="ik-page flex flex-col items-center justify-center min-h-screen relative">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center z-10">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          You really shouldn&apos;t see this unless you&apos;ve got the right
          token.
        </h1>
      </main>
    </div>
  );
};

export default Gated;
