import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import ButtonSocialTwitter from "@components/button-social-twitter";
import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";
import Wallet from "@components/wallet";
import Alert from "@components/alert";
import Button from "@components/button";

interface FormProps extends PuzzleInput {
  email: string;
  address?: string;
}

interface ComponentProps extends PuzzleInput {
  successMessage?: string;
  nftId?: string;
  name: string;
}

const WalletEmail = ({
  puzzleId,
  successMessage,
  nftId,
  name,
}: ComponentProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormProps>();

  const [walletSigned, setWalletSigned] = useState(false);

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const res = await formSubmit({ data });
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
      <>
        {(isSubmitSuccessful || walletSigned) && <Alert text="You win!" />}
        {!isSubmitSuccessful && errors?.puzzleId && (
          <Alert text="Looks like you've already submitted for this puzzle! Thanks for playing." />
        )}
      </>
      {!isSubmitSuccessful && !errors?.puzzleId && !walletSigned && (
        <div className="">
          <div className="mb-8">
            <Alert text={successMessage || "You did it!"} />
          </div>

          {!nftId && (
            <p className="text-sm font-normal mb-8">
              Connect your web3 wallet and sign the message to be part of an
              early player leaderboard.
            </p>
          )}

          <div className="mb-10">
            {nftId ? (
              <Button
                text="Claim NFT Treasure"
                href={`/claim/${name}`}
                fullWidth={true}
              />
            ) : (
              <Wallet onWalletSignature={onWalletSignature} />
            )}
          </div>
          <p className="text-center mb-8">- or -</p>
          <p className="text-sm font-normal mb-4">
            Drop your email if web3 is not your thing.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
              type="email"
              placeholder="&rsaquo; Enter your email address"
              id="email"
              {...register("email")}
            />

            <input type="hidden" {...register("puzzleId")} value={puzzleId} />
            <Button
              text="Join the mailing list"
              fullWidth={true}
              type="submit"
              disabled={!isValid}
            />
          </form>
          <div className="mt-6 flex">
            <div className="w-full flex items-center justify-center">
              <ButtonSocialTwitter />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletEmail;
