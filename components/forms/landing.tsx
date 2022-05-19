import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import ButtonSocialTwitter from "@components/button-social-twitter";
import { ETH_ADDRESS_REGEX } from "@lib/constants";
import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";

interface FormInput extends PuzzleInput {
  name: string;
  email: string;
}

const LandingForm = ({ puzzleId }: PuzzleInput) => {
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

    {isSubmitSuccessful && <p>Thanks for joining, we will be in touch!</p>}
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
          <input
            className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
            type="text"
            placeholder="&rsaquo; Enter your name"
            id="name"
            {...register('name')}
          />
          {errors?.email && (
            <p>
              Email required.
            </p>
          )}

          <input
            className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
            type="email"
            placeholder="&rsaquo; Enter your email address"
            id="email"
            {...register('email', { required: true })}
          />

          <input type="hidden" {...register("puzzleId")} value={puzzleId} />
          <button
            className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
            type="submit"
            value="Join the mailing list"
            disabled={!isValid}
          >
            Join the mailing list
          </button>
        </form>
        <div className="mt-6 flex">
          <div className="w-2/4 flex items-center justify-center">
            <ButtonSocialTwitter />
          </div>
          <div className="w-2/4">
            <Link href="/puzzle/avalanche">
              <a>
                <Image
                  src="/ik-logo-social.png"
                  alt="Infinity Keys logo for Avalanche Summit"
                  width={320}
                  height={320}
                  className="pb-4"
                />
              </a>
            </Link>
            <p className="text-center">
              <Link href="https://www.youtube.com/c/Avalancheavax">
                Watch the Avalanche Summit Workshop.
              </Link>
            </p>
          </div>
        </div>
      </div>
    )}
  </>)
};

export default LandingForm;
