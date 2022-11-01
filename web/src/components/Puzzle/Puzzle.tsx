/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */
import {
  ComponentType,
  FormEvent,
  //  useEffect,
  useRef,
  //useState
} from 'react'

//import { useMachine } from '@xstate/react'
import clsx from 'clsx'
import loRange from 'lodash/range'
//import { useRouter } from 'next/router'
import RICIBs from 'react-individual-character-input-boxes'

import Button from 'src/components/Button'
//import LoadingIcon from 'src/components/LoadingIcon'
import Markdown from 'src/components/Markdown'
//import useCurrentWidth from 'src/hooks/useCurrentWidth'
import Lock from 'src/svgs/Lock'

//import { puzzleMachine } from './puzzle.xstate'

interface PuzzleProps {
  count: number
  puzzleId: string
  boxes?: boolean
  failMessage?: string
  SuccessComponent?: ComponentType<{}>
  forwardOnFail?: boolean
}

const Puzzle = ({
  // Used to show number of boxes/remaining characters. Usually pulled in via
  // GrqphQL query.
  count,
  // Unique uuid of the puzzle
  puzzleId,
  // Show the "boxes" version of the puzzle? "false" shows textbox
  boxes = true,
  // What should be said when the guess is wrong?
  failMessage,
}: // If success component exists, then Puzzle **will not route to success page**.
// Use this for entirely inline/embedded Puzzles.
//SuccessComponent,
// Enable/disable forwarding to fail_route
//forwardOnFail = true,
PuzzleProps) => {
  //const router = useRouter()
  //const [{ context, matches }, send] = useMachine(puzzleMachine, {
  //   context: { count, puzzleId, redirect: !SuccessComponent },
  //   // Use the router hook from within react to fire the action within xstate
  //   actions: {
  //     // The TS error below is a bug in xstate, https://xstate.js.org/docs/guides/typescript.html#typegen
  //     // @TODO: remove @ts-ignore when fixed
  //     goToSuccessRoute: (context, event) =>
  //       // @ts-ignore
  //       router.push(event.data?.success_route || '/'),
  //     goToFailRoute: (context, event) =>
  //       forwardOnFail && router.push(event.data.fail_route),
  //   },
  //   devTools: process.env.NODE_ENV === 'development',
  // })

  // const [height, setHeight] = useState(0)
  // const width = useCurrentWidth()
  const ref = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   send({ type: 'PUZZLE_INFO', puzzleInfo: { puzzleId, count } })
  // }, [send, puzzleId, count])

  // useEffect(() => {
  //   if (ref.current) setHeight(ref.current.clientHeight)
  // }, [width])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //if (context.count === context.text.length) send('GUESS')
  }

  return (
    <>
      {/* {(matches('guessing') || matches('guessCorrect.go')) && (
        <div style={{ height }} className="flex items-center justify-center">
          <LoadingIcon />
        </div>
      )} */}

      {/* {(matches('idle') ||
        matches('guessIncorrect') ||
        matches('readyToGuess')) && ( */}
      <div className="z-10 flex justify-center" ref={ref}>
        <div>
          <div className="flex py-5">
            <div className="w-6">
              <Lock />
            </div>
            <h1 className="pt-2 pl-4 text-base font-bold">Solve Puzzle</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="magic-input font-bold text-turquoise">
              {boxes && (
                <RICIBs
                  //amount={context.count}
                  amount={6}
                  //handleOutputString={(text) => send({ type: 'INPUT', text })}
                  handleOutputString={(text) => console.log(text)}
                  inputRegExp={/^\S*$/}
                  //autoFocus={true}
                  // inputProps={loRange(context.count).map(() => ({
                  //   className: 'ik-code-input',
                  // }))}
                  inputProps={loRange(6).map(() => ({
                    className: 'ik-code-input',
                  }))}
                />
              )}
            </div>
            <div
              className={clsx('mb-2', {
                //invisible: !matches('guessIncorrect'),
              })}
            >
              <div data-cy="fail_message_check" className="opacity-50">
                <Markdown>
                  {failMessage ||
                    'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
                </Markdown>
              </div>
            </div>

            <div data-cy="submit" className="flex justify-center">
              <Button
                text="Submit"
                type="submit"
                //disabled={!matches('readyToGuess')}
              />
            </div>
          </form>
        </div>
      </div>
      {/* )} */}

      {/* {matches('guessCorrect.stay') && SuccessComponent && <SuccessComponent />} */}
    </>
  )
}

export default Puzzle
