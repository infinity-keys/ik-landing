import { useState } from 'react'

import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'

import Button from 'src/components/Button'
const SimpleTextInput = ({ count, stepId, makeAttempt }) => {
  const [text, setText] = useState('')

  const handleMakeAttempt = (e) => {
    e.preventDefault()
    if (text.length !== count) return

    makeAttempt({
      variables: {
        stepId,
        data: { simpleTextSolution: text },
      },
    })
  }

  return (
    <div>
      <form onSubmit={handleMakeAttempt}>
        <RICIBs
          amount={count}
          handleOutputString={(t) => setText(t)}
          inputRegExp={/^\S*$/}
          inputProps={loRange(count).map(() => ({
            className: 'ik-code-input',
          }))}
        />

        <div className="pt-8">
          <Button
            text="Submit"
            type="submit"
            disabled={text.length !== count}
          />
        </div>
      </form>
    </div>
  )
}

export default SimpleTextInput
