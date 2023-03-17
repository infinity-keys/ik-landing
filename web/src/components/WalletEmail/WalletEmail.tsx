import { useState } from 'react'

import { PuzzleInput } from '@infinity-keys/core'

import {
  useForm,
  // SubmitHandler
} from '@redwoodjs/forms'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import ButtonSocialTwitter from 'src/components/ButtonSocialTwitter/ButtonSocialTwitter'
import Markdown from 'src/components/Markdown/Markdown'

// @TODO: handle form submit
// import { formSubmit } from "src/lib/fetchers";

interface FormProps extends PuzzleInput {
  email: string
  address?: string
}

interface ComponentProps extends PuzzleInput {
  successMessage?: string
  nftId?: string
  name: string
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
    // setError,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormProps>()

  const [
    walletSigned,
    // setWalletSigned
  ] = useState(false)

  // @TODO: use real onSubmit
  const onSubmit = (data) => {
    console.log(data)
  }

  // const onSubmit: SubmitHandler<FormProps> = async (data) => {
  //   const res = await formSubmit({ data })
  //   // 409 === conflict === already submitted
  //   if (res.status === 409) {
  //     // Set error message
  //     setError('puzzleId', {
  //       type: 'custom',
  //       message: 'Already submiitted',
  //     })
  //     return false
  //   }
  //   return true
  // }

  // @TODO: get this to just call onSubmit() above OR on wallet sign, pass address
  // to a hidden field and submit form
  // const onWalletSignature = async (address: string) => {
  //   const res = await formSubmit({
  //     data: {
  //       puzzleId,
  //       address,
  //     },
  //   })
  //   if (res.status === 409) {
  //     setError('puzzleId', {
  //       type: 'custom',
  //       message: 'Already submitted',
  //     })
  //     return
  //   }
  //   setWalletSigned(true)
  // }

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
              <div className="mx-auto max-w-2xl pb-16 text-center text-lg text-gray-100">
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
                  to={`/claim/${name}`}
                  fullWidth={true}
                />
              </div>
              <p className="mb-8 text-center">- or -</p>
            </>
          ) : (
            <p className="-mt-10"></p>
          )}
          {/**<p className="text-center mb-8">- or -</p> */}

          <p className="mb-4 text-sm font-normal">
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
              className="mb-6 block w-full rounded-md bg-gray-500 py-2 px-4 text-sm lowercase text-gray-150 placeholder:text-gray-150"
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              required
              placeholder="&rsaquo; Enter your email address"
              id="email"
              {...register('email')}
            />
            <input type="hidden" {...register('puzzleId')} value={puzzleId} />
            <Button
              text={nftId ? 'Claim NFT with Email' : 'Submit'}
              fullWidth={true}
              type="submit"
              disabled={!isValid}
            />
          </form>
          <div className="mt-6 flex">
            <div className="flex w-full items-center justify-center">
              <ButtonSocialTwitter />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletEmail
