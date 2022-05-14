import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";

import Wrapper from "@components/wrapper";
import { ETH_ADDRESS_REGEX } from "@lib/constants";
import { PuzzleInput } from "@lib/types";


interface FormInput extends PuzzleInput {
  address: string;
}

const Dev: NextPage<PuzzleInput> = ({ puzzleId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    const res = await fetch("/api/submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(res.statusText);
    // console.log(res);
    return true;
  };

  return (
    <Wrapper>
      <Head>
        <title>Dev</title>
      </Head>

      <div className="ik-page radial-bg scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
          </header>

          <main className="flex flex-col items-center justify-center w-full flex-1 z-10 ">
            {isSubmitSuccessful && <p>Thank you for testing with us.</p>}
            {!isSubmitSuccessful && (
              <div className="">
                <h1 className="text-3xl font-medium mb-6">Dev</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="wallet" className="block pb-2">
                    Wallet address
                  </label>
                  <input
                    className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
                    type="text"
                    placeholder="&rsaquo; starts with 0x, 40 characters long"
                    pattern={ETH_ADDRESS_REGEX.source}
                    {...register("address", {
                      required: true,
                      pattern: ETH_ADDRESS_REGEX,
                    })}
                  />
                  {errors?.address && (
                    <p>
                      Addresses must start with &quot0x&quot and be 40
                      characters long
                    </p>
                  )}
                  <input type="hidden" {...register("puzzleId")} value={puzzleId} />
                  <button
                    className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
                    type="submit"
                    value="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;

export function getStaticProps(): { props: PuzzleInput } {
  const props = {
    puzzleId: "a89b6cf8-81b1-45a5-9f69-18af130178e6",
  }
  return {
    props,
  }
}
