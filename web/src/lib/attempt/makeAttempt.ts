import { navigate, routes } from '@redwoodjs/router'

export const redirectUser = ({
  finalStep,
  isAnon,
  stepParam,
  slug,
}: {
  finalStep: boolean
  isAnon: boolean
  stepParam: string
  slug: string
}) => {
  if (finalStep) {
    return isAnon
      ? navigate(routes.anonPuzzleLanding({ slug }))
      : navigate(routes.puzzleLanding({ slug }))
  } else {
    return isAnon
      ? navigate(
          routes.anonPuzzleStep({
            slug,
            step: parseInt(stepParam, 10) + 1,
          })
        )
      : navigate(
          routes.puzzleStep({
            slug,
            step: parseInt(stepParam, 10) + 1,
          })
        )
  }
}

export const createAnonAttempt = async ({
  stepId,
  stepParam,
  puzzleId,
  reqBody,
}) => {
  const apiUrl = new URL(
    `${global.RWJS_API_URL}/anonAttempt`,
    window.location.origin
  )

  apiUrl.searchParams.set('stepId', stepId)
  apiUrl.searchParams.set('stepParam', stepParam)
  apiUrl.searchParams.set('puzzleId', puzzleId)

  const body = JSON.stringify({ attempt: reqBody })

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body,
    })
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
  }
}
