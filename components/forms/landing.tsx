import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import ButtonSocialTwitter from "@components/button-social-twitter";
import { ETH_ADDRESS_REGEX } from "@lib/constants";
import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";
import Wallet from "@components/wallet";

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

  const onWalletSignature = async (address: string) => {
    // @TODO: try/catch here
    await formSubmit({
      data: {
        puzzleId,
        address,
      }
    })
  }

  return (<>

    {isSubmitSuccessful && <p>Thanks for joining, we will be in touch!</p>}
    {!isSubmitSuccessful && (
      <div className="">


        <p className="text-sm font-normal mb-4">
          You did it!
        </p>
        <p className="text-sm font-normal mb-8">
          Connect your web3 wallet to be part of an early player leaderboard.
        </p>

        <div className="flex justify-center mb-10">
          <Wallet onWalletSignature={onWalletSignature} />
        </div>

        <p className="text-sm font-normal mb-4">
          Drop us an email if web3 is not your thing.
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
    )
    }
  </>)
};

export default LandingForm;
