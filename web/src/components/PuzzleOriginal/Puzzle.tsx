/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */

// React libraries for managing state of user's answer
import React, { useState, useEffect, FormEvent } from 'react'

// Styling and logic for the boxes used to answer the puzzle
import RICIBs from 'react-individual-character-input-boxes'

import Button from 'src/components/Button'

// small padlock icon
import Lock from 'src/svgs/Lock'

// we need the loading icon for when the user types in the wrong answer
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

type PuzzleProps = {
  answer: string
}
const Puzzle = ({ answer = '' }: PuzzleProps) => {
  const [canSubmit, setCanSubmit] = useState(false)
  const [guess, setGuess] = useState('')

  // The state of our user's answer
  const [showFail, setShowFail] = useState(false)

  // The state of the "Play More" button (show or no-show)
  const [showPlayMoreButton, setShowPlayMoreButton] = useState(false)

  // The RICIBs must rerender when setShowFail(true)
  const [showRICIBs, setShowRICIBs] = useState(true)

  // The fake database verification of the correct answer
  const [showSuccess, setShowSuccess] = useState(false)

  const count = answer.length

  // The function that handles the user's click of the 'Submit' button
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGuess('')

    if (guess.toLowerCase() === answer.toLowerCase()) {
      setTimeout(() => {
        setShowSuccess(true)
      }, 1000)
      // console.log('solved!')
      setShowPlayMoreButton(true)
    } else {
      // console.log('fail')

      // This should clear the input boxes, but it doesn't
      // setGuess('')
      setShowRICIBs(false)
      setTimeout(() => {
        setShowFail(true)
        setShowRICIBs(true)
        setCanSubmit(false)
      }, 1000)
    }
  }

  if (showPlayMoreButton) {
    return (
      <div>
        {/* Play More Button */}
        {showSuccess ? (
          <div className="play-more-button-container container flex max-w-[12rem] justify-center">
            <Button text="Play More" fullWidth to={'/packs'} />
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Lock icon & "solve puzzle" caption*/}
      <div className="flex py-5">
        <div className="w-6">
          <Lock />
        </div>
        <h1 className="pt-2 pl-4 text-base font-bold">Solve Puzzle</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Boxes */}
        {showRICIBs ? (
          <div className="magic-input font-bold text-turquoise">
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
                Thats not it. Need help?{' '}
                <a href="https://discord.gg/infinitykeys" target="_blank">
                  <u>Join our discord</u>
                </a>
              </p>
            </div>
          ) : (
            <div className="invisible-message opacity-0">
              <p>
                'this is placeholder text that is the same height as the
                markdown text above'
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div data-cy="submit" className="flex justify-center">
          <Button text="Submit" type="submit" disabled={!canSubmit} />
        </div>
      </form>
    </div>
  )
}

export default Puzzle
