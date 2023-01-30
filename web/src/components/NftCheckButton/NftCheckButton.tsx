import { useState } from 'react'

import clsx from 'clsx'
import { FindStepQuery } from 'types/graphql'
import { useAccount } from 'wagmi'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

import Markdown from '../Markdown'

const NftCheckButton = ({
  step,
  puzzleId,
  numberOfSteps,
}: {
  step: FindStepQuery['step']
  puzzleId: string
  numberOfSteps: number
}) => {
  const { slug, step: stepParam } = useParams()
  const { getToken } = useAuth()
  const { address } = useAccount()
  console.log('account: ', address)

  const [loading, setLoading] = useState(false)
  const [failedAttempt, setFailedAttempt] = useState(false)

  const handleClick = async () => {
    if (!address) return
    setFailedAttempt(false)
    setLoading(true)

    // /.redwood/functions/attempt vs /attempt
    const apiPath = `${
      global.RWJS_API_URL.includes('.redwood') ? window.location.origin : ''
    }${global.RWJS_API_URL}/attempt`

    const apiUrl = new URL(apiPath)

    apiUrl.searchParams.set('stepId', step.id)
    apiUrl.searchParams.set('stepParam', stepParam)
    apiUrl.searchParams.set('puzzleId', puzzleId)
    apiUrl.searchParams.set('stepType', step.type)
    console.log('step: ', step)

    apiUrl.searchParams.set('chainId', '137')
    apiUrl.searchParams.set('tokenId', '1')
    apiUrl.searchParams.set(
      'contractAddress',
      '0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9'
    )
    apiUrl.searchParams.set(
      'account',
      '0x748De431c0a978f4f5B61dbED749Adca710A282B'
    )

    const body = JSON.stringify({ attempt: address })

    try {
      const token = await getToken()
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'auth-provider': 'magicLink',
          Authorization: `Bearer ${token}`,
        },
        body,
      })

      setLoading(false)
      if (response.ok) {
        const data = await response.json()

        // if user guesses correctly, move them to next step
        // or puzzle landing if it is the last step
        if (data.success) {
          if (parseInt(stepParam, 10) + 1 > numberOfSteps) {
            return navigate(routes.puzzleLanding({ slug }))
          } else {
            return navigate(
              routes.puzzleStep({ slug, step: parseInt(stepParam, 10) + 1 })
            )
          }
        }
        setFailedAttempt(true)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <Button text="Check NFTs" onClick={handleClick} />

          <div
            className={clsx(
              'relative flex justify-center pt-6 text-gray-150',
              failedAttempt ? 'opacity-1' : 'opacity-0'
            )}
            data-cy="fail_message_check"
          >
            <Markdown>
              {step.failMessage ||
                'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
            </Markdown>
          </div>
        </>
      )}
    </div>
  )
}

export default NftCheckButton
