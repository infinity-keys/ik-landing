import type { NextPage } from "next";
import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";

const Gated: NextPage = () => {
  //  @TODO: move this to env var (blows up because of ssr)
  const [state, handleSubmit] = useForm("xknyjenl");

  return (
    <div className="ik-page flex flex-col items-center justify-center min-h-screen relative radial-bg">
      <header className="pt-14 block w-96">
        <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 z-10">
        {state.succeeded && <p>Thanks for joining, we will be in touch!</p>}
        {!state.succeeded && (
          <div className="w-96">
            <h1 className="text-3xl font-medium mb-6">Coming soon.</h1>
            <p className="text-sm font-normal mb-12">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam
            </p>
            <form onSubmit={handleSubmit}>
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
  );
};

export default Gated;
