import { navigate, routes } from '@redwoodjs/router'

export const redirectUser = ({
  finalStep,
  stepParam,
  slug,
}: {
  finalStep: boolean
  stepParam: string
  slug: string
}) => {
  if (finalStep) {
    return navigate(routes.puzzleLanding({ slug }))
  } else {
    return navigate(
      routes.puzzleStep({
        slug,
        step: parseInt(stepParam, 10) + 1,
      })
    )
  }
}
