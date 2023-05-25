import fetch from 'node-fetch'
import { z } from 'zod'

const functionCallResData = z
  .object({
    error: z.string(),
    hasUserCalledFunction: z.boolean().array(),
  })
  .partial()
  .refine(
    (data) => !!data.error || !!data.hasUserCalledFunction,
    'Should either return error or hasUserCalledFunction.'
  )

export const checkFunctionCall = async ({
  account,
  contractAddress,
  methodIds,
}: {
  account: string
  contractAddress: string
  methodIds: string[]
}) => {
  const url = new URL('/hasUserCalledFunction', process.env.FUNCTION_STREAM_URL)

  url.searchParams.set('contractAddress', contractAddress)
  methodIds.forEach((methodId) => {
    url.searchParams.set('methodId', methodId)
  })
  url.searchParams.set('walletAddress', account)

  // @TODO: Do we need a security header here?
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     'X-API-Key': process.env.POAP_API_KEY,
  //   },
  // }

  try {
    const res = await fetch(url)
    const unknownData = await res.json()
    const data = functionCallResData.parse(unknownData)

    if (data.error || !data.hasUserCalledFunction) {
      return { errors: ['There was a problem checking your function call'] }
    }

    return {
      hasUserCalledFunction: data?.hasUserCalledFunction?.every((b) => b),
    }
  } catch (e) {
    return { errors: ['There was a problem checking your function call'] }
  }
}
