import type { NextPage } from "next";
import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";

const Gated: NextPage = () => {
  //  @TODO: move this to env var (blows up because of ssr)
  const [state, handleSubmit] = useForm("xknyjenl");

  return (
    <div className="ik-page radial-bg scanlines">
      <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm">
        <header className="pt-14 block w-full">
          <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
        </header>

        <main className="flex flex-col items-center justify-center w-full flex-1 z-10 ">
          {state.succeeded && <p>Thanks for joining, we will be in touch!</p>}
          {!state.succeeded && (
            <div className="">
              <h1 className="text-3xl font-medium mb-6">Coming soon.</h1>

              <p className="text-sm font-normal mb-4">
                There’s treasure everywhere.
              </p>
              <p className="text-sm font-normal mb-4">
                Discover clues, solve puzzles, and collect digital items to
                discover real treasure…or maybe create a quest of your own with
                Infinity Keys, a forthcoming massively multiplayer metaverse
                treasure hunt platform.
              </p>
              <p className="text-sm font-normal mb-12">
                Sign up below and follow on Twitter for future updates to learn
                how to play, create, and get your brand or NFT into a quest.
              </p>
              <form onSubmit={handleSubmit}>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                  type="text"
                  placeholder="&rsaquo; Enter your name"
                  name="name"
                  id="name"
                />
                {/* <label htmlFor="email">Email address</label> */}
                <input
                  className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                  type="email"
                  placeholder="&rsaquo; Enter your email address"
                  name="email"
                  id="email"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <button
                  className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
                  type="submit"
                  value="Join the mailing list"
                  disabled={state.submitting}
                >
                  Join the mailing list
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Gated;
