import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { formSubmit } from "@lib/fetchers";
import { PuzzleInput } from "@lib/types";
import Alert from "@components/alert";
import Button from "@components/button";
import Markdown from "./markdown";

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
            {successMessage && (
              <div className="pb-16 text-center text-lg text-gray-100 max-w-2xl mx-auto">
                <Markdown>{successMessage}</Markdown>
              </div>
            )}
            {!successMessage && <Alert text="You did it!" />}
          </div>

          {/*!nftId && (
            <p className="text-sm font-normal mb-8">
              Connect your web3 wallet and sign the message to be part of an
              early player leaderboard.
            </p>
          )*/}

          {nftId ? (
            <>
              <div className="mb-10">
                <Button
                  text="Claim NFT Treasure"
                  href={`/claim/${name}`}
                  fullWidth={true}
                />
              </div>
              <p className="text-center mb-8">- or -</p>
            </>
          ) : (
            <p className="-mt-10"></p>
          )}
          {/**<p className="text-center mb-8">- or -</p> */}

          <p className="text-sm font-normal mb-4">
            {nftId ? (
              <>
                Submit your email to save this NFT to your profile and get it
                delivered straight to your inbox.
              </>
            ) : (
              <>Submit your email to save your progress.</>
            )}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              required
              placeholder="&rsaquo; Enter your email address"
              id="email"
              {...register("email")}
            />
            <input type="hidden" {...register("puzzleId")} value={puzzleId} />
            <Button
              text={nftId ? "Claim NFT with Email" : "Submit"}
              fullWidth={true}
              type="submit"
              disabled={!isValid}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default WalletEmail;
