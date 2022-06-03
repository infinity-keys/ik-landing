import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { InformationCircleIcon } from "@heroicons/react/solid";

import ButtonSocialTwitter from "@components/button-social-twitter";
import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";
import Wallet from "@components/wallet";

interface FormInput extends PuzzleInput {
  name: string;
  email: string;
  address?: string;
}

function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-md bg-blue p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">
            {text}
          </p>

        </div>
      </div>
    </div>
  );
}

const WalletEmail = ({ puzzleId }: PuzzleInput) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormInput>();

  const [walletSigned, setWalletSigned] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await formSubmit({ data });
    console.log(res);
    // 409 === conflict === already submitted
    if (res.status === 409) {
      // Set error message
      setError("puzzleId", {
        type: "custom",
        message: "Already submiitted",
      });
      return false;
    }
    return true;
  };

  // @TODO: get this to just call onSubmit() above OR on wallet sign, pass address
  // to a hidden field and submit form
  const onWalletSignature = async (address: string) => {
    const res = await formSubmit({
      data: {
        puzzleId,
        address,
      },
    });
    if (res.status === 409) {
      setError("puzzleId", {
        type: "custom",
        message: "Already submiitted",
      });
      return;
    }
    setWalletSigned(true);
  };

  return (
    <>
      {(isSubmitSuccessful || walletSigned) && <Alert text="Thanks for joining, we will be in touch!" />}
      {!isSubmitSuccessful && errors?.puzzleId &&
        <Alert text="Looks like you've already submitted for this puzzle! Thanks for playing." />
      }
      {!isSubmitSuccessful && !errors?.puzzleId && !walletSigned && (
        <div className="">

          <p className="text-sm font-normal mb-4">You did it!</p>
          <p className="text-sm font-normal mb-8">
            Connect your web3 wallet to be part of an early player leaderboard.
          </p>

          <div className="flex justify-center mb-10">
            <Wallet onWalletSignature={onWalletSignature} />
          </div>
          <p className="text-center mb-8">- or -</p>
          <p className="text-sm font-normal mb-4">
            Drop us an email if web3 is not your thing.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
              type="text"
              placeholder="&rsaquo; Enter your name"
              id="name"
              {...register("name")}
            />


            <input
              className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
              type="email"
              placeholder="&rsaquo; Enter your email address"
              id="email"
              {...register("email")}
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
    </>
  );
};

export default WalletEmail;
