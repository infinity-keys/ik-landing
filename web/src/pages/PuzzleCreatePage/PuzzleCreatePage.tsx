import { useRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  TextField,
  CheckboxField,
  Submit,
  useFieldArray,
  useWatch,
  Control,
} from '@redwoodjs/forms'

const fieldArrayName = 'array'

const DisplayNFT = ({
  control,
  index,
}: {
  control: Control
  index: number
}) => {
  const data = useWatch({
    control,
    name: `${fieldArrayName}.${index}`,
  })

  if (!data?.tokenId) return null

  return (
    <div>
      <h3>Submitted NFT</h3>
      <p>
        {data?.tokenId} {data?.contractName}
      </p>
    </div>
  )
}

const EditNFT = ({
  update,
  index,
  value,
  control,
}: {
  update: Function
  index: number
  value: any
  control: Control
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  })

  return (
    <div>
      <div>
        <DisplayNFT control={control} index={index} />
      </div>
      <Label name="tokenId" className="rw-label">
        Token Id
      </Label>
      <TextField
        placeholder="Token Id"
        {...register(`tokenId`, { required: true })}
      />
      <Label name="contractName" className="rw-label">
        Contract Name
      </Label>
      <TextField
        placeholder="Contract Name"
        {...register(`contractName`, { required: true })}
      />
      <Submit
        className="rw-button-group rw-button rw-button-blue"
        onClick={handleSubmit((data) => {
          update(index, data)
        })}
      >
        Add NFT to State
      </Submit>
    </div>
  )
}

export default function PuzzleForm() {
  const { control } = useForm()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  })
  const formMethods = useForm({
    defaultValues: {
      [fieldArrayName]: [],
    },
  })
  const renderCount = useRef(1)

  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  return (
    <div>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        Times this component has rendered: <b>{renderCount.current}</b>
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

              {fields.map((field, index) => (
                <fieldset key={field.id}>
                  <EditNFT
                    control={control}
                    update={update}
                    index={index}
                    value={field}
                  />
                  <button
                    className="rw-button-group rw-button rw-button-blue"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </fieldset>
              ))}

              <div className="rw-button-group">
                <button
                  className="rw-button rw-button-blue"
                  onClick={() => {
                    append({
                      tokenId: '',
                      contractName: '',
                    })
                  }}
                >
                  Add NFT
                </button>
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
