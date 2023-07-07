import { useRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  TextField,
  CheckboxField,
  Submit,
  // useFieldArray,
  // useWatch,
} from '@redwoodjs/forms'

const PuzzleForm = () => {
  const formMethods = useForm()
  const renderCount = useRef(0)

  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  return (
    <div>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        This component has rendered <b>{renderCount.current}</b> times
      </div>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Welcome to the Puzzle Creation Form
          </h2>
        </header>
        <div className="rw-segment-main text-gray-500">
          <div>
            {process.env.NODE_ENV === 'development' && (
              <DevTool control={formMethods.control} />
            )}
            <Form>
              <div className="max-w-3xl">
                <h2 className="my-8 text-4xl font-bold">Create a Puzzle</h2>
                <Label name="name" className="rw-label">
                  Name
                </Label>

                <TextField name="name" className="rw-input" />

                <Label name="slug" className="rw-label">
                  Slug
                </Label>

                <TextField name="slug" className="rw-input" />

                <Label name="explanation" className="rw-label">
                  Explanation
                </Label>

                <TextField name="explanation" className="rw-input" />

                <Label name="successMessage" className="rw-label">
                  Success message
                </Label>

                <TextField name="successMessage" className="rw-input" />

                <Label name="listPublicly" className="rw-label">
                  List publicly
                </Label>

                <CheckboxField name="listPublicly" className="rw-input" />

                <Label name="parentId" className="rw-label">
                  Parent Id
                </Label>

                <TextField name="parentId" className="rw-input" />

                <Label name="sortWeight" className="rw-label">
                  Sort Weight
                </Label>

                <TextField name="sortWeight" className="rw-input w-14" />
              </div>

              <div className="rw-button-group">
                <button className="rw-button rw-button-blue">Add NFT</button>
              </div>
              <div className="rw-button-group">
                <button className="rw-button rw-button-blue">Add Step</button>
              </div>
              <div className="rw-button-group">
                <Submit className="rw-button-group rw-button rw-button-blue">
                  Save Puzzle to Database
                </Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PuzzleForm
