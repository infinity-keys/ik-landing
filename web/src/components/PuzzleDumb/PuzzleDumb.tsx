/**
 * @file
 *
 * The embedded puzzle form used to attempt solution. It does not interact with
 * the backend and instead uses a hardcoded value for the simple text solution.
 *
 */

// React libraries for managing state of user's answer
import React, { useState, FormEvent } from 'react'

import RICIBs from 'react-individual-character-input-boxes'

import { routes } from '@redwoodjs/router'

// Styling and logic for the input boxes used to answer the puzzle

// small padlock icon
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Lock from 'src/svgs/Lock'

// we need the loading icon for when the user types in the wrong answer

type PuzzleProps = {
  answer: string
}
const PuzzleDumb = ({ answer = '' }: PuzzleProps) => {
  // This is what the user enters into the RICIBs
  const [guess, setGuess] = useState('')

  // Our hint for the puzzle's password
  const [hintVisible, setHintVisible] = useState(false)

  // The submit button is disabled unless all RICIBs are filled
  // This determines whether or not the user can submit a guess
  const [canSubmit, setCanSubmit] = useState(false)

  // This determines whether or not the user has answered correctly
  // ...it happens as soon as the user enters the correct answer
  // ...therefore it is not the same as the 'showSuccess' state
  const [correctAnswer, setCorrectAnswer] = useState(false)

  // This determines whether or not the user can go on to play more puzzles
  // ...it is delayed by a setTimeout that mimics a server call
  // ...therefore it is not the same as the 'correctAnswer' state
  const [showSuccess, setShowSuccess] = useState(false)

  // This controls the visibility of the RICIBs (input boxes)
  // ...they are delayed by a setTimeout that mimics a server call
  const [showRICIBs, setShowRICIBs] = useState(true)

  // This controls the visibility of the "Wrong answer" message
  // ...it is delayed by a setTimeout that mimics a server call
  const [showFail, setShowFail] = useState(false)

  const count = answer.length

  // The function that handles the user's click of the 'Submit' button
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (guess.toLowerCase() === answer.toLowerCase()) {
      // the correct answer was entered
      // ...but the setShowSuccess is still false
      // ...which means the loading icon will be displayed
      setCorrectAnswer(true)

      // we are now mimicing a server call
      setTimeout(() => {
        // after a delay, the user can proceed to play more puzzles
        setShowSuccess(true)
      }, 1000)
    } else {
      // delete the RICIB (input boxes)
      // ...display the loading icon instead to mimic a server call
      setShowRICIBs(false)

      // these actions are delayed to mimic a server call
      setTimeout(() => {
        setShowFail(true)
        setShowRICIBs(true)
        setCanSubmit(false)
      }, 1000)
    }
  }

  {
    /* If the answer is correct, go ahead and display just this stuff */
  }
  if (correctAnswer) {
    return (
      <div>
        {/* Play More Button */}
        {showSuccess ? (
          <div
            className="play-more-button-container container flex max-w-[12rem] flex-col justify-center text-center"
            data-cy="success_message_check"
          >
            <p className="pb-4 text-xl">Success!</p>
            <Button text="Enter" fullWidth to={routes.play()} size="large" />
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>
    )
  }

  {
    /* Otherwise, as long as the answer is incorrect, return the rest of this stuff */
  }
  return (
    <div>
      {/* Lock icon & "solve puzzle" caption*/}
      <div className="flex py-5">
        <div className="w-6">
          <Lock />
        </div>
        <h1 className="pt-2 pl-4 text-base font-bold">Solve Puzzle</h1>
        <button
          onClick={() => setHintVisible(!hintVisible)}
          className="mt-2 ml-4 rounded px-2 uppercase tracking-wider text-brand-accent-primary transition-colors hover:bg-black/40 hover:text-brand-accent-secondary"
        >
          {hintVisible ? 'Unlock' : 'Hint?'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Boxes */}
        {showRICIBs ? (
          <div className="magic-input font-bold text-brand-accent-primary">
            <RICIBs
              amount={count}
              handleOutputString={(text) => {
                setGuess(text)
                if (count === text.length) {
                  setCanSubmit(true)
                } else {
                  setCanSubmit(false)
                }
                // console.log(text)
              }}
              inputRegExp={/^\S*$/}
              inputProps={Array.from(answer).map(() => ({
                className: 'ik-code-input',
              }))}
            />
          </div>
        ) : (
          <LoadingIcon />
        )}

        {/* Wrong answer & Discord invitation */}
        <div data-cy="fail_message_check" className="opacity-50">
          {showFail ? (
            <div className="visible-message">
              <p>
                That&apos;s not it. Need help?{' '}
                <a
                  href="https://discord.gg/infinitykeys"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>Join our discord</u>
                </a>
              </p>
            </div>
          ) : (
            <div className="invisible-message opacity-0">
              <p>
                &apos;this is placeholder text that is the same height as the
                markdown text above&apos;
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div data-cy="submit" className="flex justify-center">
          <Button
            text="Submit"
            type="submit"
            disabled={!canSubmit}
            variant="solid"
          />
        </div>
      </form>
    </div>
  )
}

export default PuzzleDumb
