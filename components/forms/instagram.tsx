import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import ButtonSocialTwitter from "@components/button-social-twitter";
import { ETH_ADDRESS_REGEX } from "@lib/constants";
import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";
import Head from "next/head";

interface FormInput extends PuzzleInput {
  address: string;
}

const InstagramForm = ({ puzzleId }: PuzzleInput) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await formSubmit({ data })

    if (!res.ok) throw new Error(res.statusText);
    return true;
  };
  return (<>
    <Head>
      <title>Instagram</title>
    </Head>
    {isSubmitSuccessful && <p>Thank you for testing with us.</p>}
    {!isSubmitSuccessful && (
      <div className="">
        <h1 className="text-3xl font-medium mb-6">Coming soon.</h1>

        <p className="text-sm font-normal mb-4">
          Discover clues, solve puzzles, and collect digital items to
          discover real treasure — or create a quest of your own.
        </p>
        <p className="text-sm font-normal mb-4">
          Infinity Keys is a forthcoming massively multiplayer metaverse
          treasure hunt platform.
        </p>
        <p className="text-sm font-normal mb-12">
          There&apos;s treasure everywhere.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="wallet" className="block pb-2">
            Wallet address
          </label>
          {errors?.address && (
            <p className="mb-4 text-sm text-gray-200">
              Addresses must start with &#34;0x&#34; and be 40
              characters long
            </p>
          )}
          <input
            className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
            type="text"
            placeholder="&rsaquo; starts with 0x, 40 characters long"
            id="wallet"
            {...register("address", { required: true, pattern: ETH_ADDRESS_REGEX })}
          />

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
        <div className="mt-6 flex">
          <div className="w-2/4 flex items-center justify-center">
            <ButtonSocialTwitter />
          </div>
        </div>
      </div>
    )}
  </>)
};

export default InstagramForm;
