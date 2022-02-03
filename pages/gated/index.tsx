import type { NextPage } from "next";
import Head from "next/head";

const Gated: NextPage = () => {
  return (
    <div className="ik-page flex flex-col items-center justify-center min-h-screen relative radial-bg">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 z-10">
        <div className="w-96 align">
          <h1 className="text-3xl font-medium mb-6">Coming soon.</h1>
          <p className="text-sm font-normal mb-12">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam
          </p>
          <form className="">
            <input
              className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
              type="text"
              placeholder="&rsaquo; Enter your email address"
            />
            <button
              className="block w-full text-xs text-blue font-bold bg-turquoise rounded-md py-2 px-4"
              type="submit"
              value="Join the mailing list"
            >
              Join the mailing list
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Gated;
