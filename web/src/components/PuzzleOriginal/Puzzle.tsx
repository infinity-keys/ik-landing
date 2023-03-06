// React libraries for managing state of user's answer
import React, { useState, FormEvent } from 'react'
// Styling and logic for the boxes used to answer the puzzle
import RICIBs from 'react-individual-character-input-boxes'

import Button from 'src/components/Button'

// small padlock icon
import Lock from 'src/svgs/Lock'

// markdown makes it easy to add links to text
import Markdown from 'src/components/Markdown'

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

  const count = answer.length

  // The function that handles the user's click of the 'Submit' button
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (guess.toLowerCase === answer.toLowerCase) {
      // Yay we solved it!
      console.log('solved!')
    } else {
      console.log('fail')
    }

    setGuess('')

    // // defining the user's answer as a string mapped from the RICIBs, which
    // // create <input> elements in the DOM via the RICIBs library
    // const inputText = Array.from(e.currentTarget.getElementsByTagName('input'))
    //   .map((input: HTMLInputElement) => input.value)
    //   .join('')

    // // What happens when the user fills out all 6 RICIBs,
    // // but their answer is wrong nontheless:
    // if (
    //   inputText.length === answer.length &&
    //   inputText.toLowerCase() !== answer
    // ) {
    //   setShowFail(true) // show the "wrong answer" message

    //   // The RICIBs are cleared after the user submits an incorrect answer
    //   const inputFields = e.currentTarget.getElementsByTagName('input')
    //   for (let i = 0; i < inputFields.length; i++) {
    //     inputFields[i].value = ''
    //   }
    // }

    // // What happens when the user fills out all 6 RICIBs correctly,
    // // regardless of whether they use upper or lower case letters:
    // if (
    //   inputText.length === answer.length &&
    //   inputText.toLowerCase() === answer
    // ) {
    //   setShowPlayMoreButton(true)
    // }
  }

  if (showPlayMoreButton) {
    return (
      <>
        {/* Play More Button */}
        <div className="play-more-button-container container flex max-w-[12rem] justify-center">
          <Button text="Play More" fullWidth to={'/packs'} />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Lock icon & "solve puzzle" caption*/}
      <div className="flex py-5">
        <div className="w-6">
          <Lock />
        </div>
        <h1 className="pt-2 pl-4 text-base font-bold">Solve Puzzle</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Boxes */}
        <div className="magic-input font-bold text-turquoise">
          <RICIBs
            amount={count}
            handleOutputString={(text) => {
              setGuess(text)

              const didSolve = text.toLowerCase() === answer
              console.log(didSolve)

              if (count === text.length) {
                setCanSubmit(true)
              } else {
                setCanSubmit(false)
              }

              // if (didSolve) {
              //   setShowPlayMoreButton(true)
              // }

              // if (!didSolve && text.length === count) {
              //   setShowFail(true)
              // }

              console.log(text)
            }}
            inputRegExp={/^\S*$/}
            inputProps={Array.from(answer).map(() => ({
              className: 'ik-code-input',
            }))}
          />
        </div>

        {/* Wrong answer & Discord invitation */}
        <div data-cy="fail_message_check" className="opacity-50">
          {showFail ? (
            <Markdown>
              {
                'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'
              }
            </Markdown>
          ) : (
            <div className="invisible-message opacity-0">
              {
                'this is placeholder text that is the same height as the markdown text above'
              }
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div data-cy="submit" className="flex justify-center">
          <Button text="Submit" type="submit" disabled={!canSubmit} />
        </div>
      </form>
    </>
  )
}

export default Puzzle
