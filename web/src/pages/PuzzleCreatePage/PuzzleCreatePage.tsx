import { useRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  TextField,
  SelectField,
  Submit,
  useFieldArray,
  useWatch,
  Control,
} from '@redwoodjs/forms'

type Step = {
  failMessage: string
  successMessage: string
  stepType: 'SIMPLE_TEXT' | 'NFT_CHECK' | undefined
} & StepTypeData

type SimpleText = {
  solution: string
}

type NftCheck = {
  contractAddress: string
  chainId: string
}

type StepTypeData = SimpleText | NftCheck

type DisplayStepTypeProps = {
  stepType: Step['stepType']
  data: StepTypeData
}

type PuzzleFormType = {
  name: string
  slug: string
  stepsArray: Step[]
}

const stepsFieldArrayName = 'stepsArray'

const DisplayStepType: React.FC<DisplayStepTypeProps> = ({
  stepType,
  data,
}) => {
  switch (stepType) {
    case 'SIMPLE_TEXT':
      return (
        <div className="font-bold">
          Solution: {(data as SimpleText).solution}
        </div>
      )
    case 'NFT_CHECK':
      return (
        <div className="font-bold">
          <div>Contract Address: {(data as NftCheck).contractAddress}</div>
          <div>Chain ID: {(data as NftCheck).chainId}</div>
        </div>
      )
    default:
      return null
  }
}

const DisplayStep = ({
  control,
  index,
}: {
  control: Control<PuzzleFormType>
  index: number
}) => {
  const data = useWatch({
    control,
    name: `${stepsFieldArrayName}.${index}`,
  })

  if (!data?.failMessage) return null

  return (
    <div className="my-4 border-2 border-zinc-500 bg-gray-100 p-4">
      <h3 className="font-bold italic">Step Currently in State:</h3>
      <div className="font-bold">Fail message: {data?.failMessage}</div>
      <div className="font-bold">Success message: {data?.successMessage}</div>
      <DisplayStepType stepType={data.stepType} data={data as StepTypeData} />
    </div>
  )
}

const EditSimpleText = ({ value }: { value: Step }) => {
  const formMethods = useForm<Step>({
    defaultValues: value,
  })

  const { register } = formMethods

  return (
    <div className="simple-text">
      <Label
        name="solution"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Solution
      </Label>
      <TextField
        className="w-full"
        placeholder="Solution"
        {...register('solution', { required: true })}
      />
    </div>
  )
}

const EditNftCheck = ({ value }: { value: Step }) => {
  const formMethods = useForm<Step>({
    defaultValues: value,
  })

  const { register } = formMethods

  return (
    <div className="nft-check">
      <Label
        name="contractAddress"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Contract Address
      </Label>

      <TextField
        className="w-full"
        placeholder="Contract Address"
        {...register('contractAddress', { required: true })}
      />
      <Label
        name="chainId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Chain ID
      </Label>

      <TextField
        className="w-full"
        placeholder="Chain ID"
        {...register('chainId', { required: true })}
      />
    </div>
  )
}

const EditStep = ({
  updateStep,
  removeStep,
  index,
  value,
  control,
}: {
  updateStep: (index: number, data: Step) => void
  removeStep: (index: number) => void
  index: number
  value: Step
  control: Control<PuzzleFormType>
}) => {
  const formMethods = useForm<Step>({
    defaultValues: value,
  })

  const { register, handleSubmit, setValue, watch } = formMethods

  const stepType = watch('stepType')

  useEffect(() => {
    register('stepType')
  }, [register])

  const onSubmit = (data: Step) => {
    updateStep(index, data)
  }

  return (
    <div className="my-4 max-w-3xl border-2 border-zinc-500 bg-zinc-300 p-4">
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div>
          <DisplayStep control={control} index={index} />
        </div>
        <Label
          name="failMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Fail message
        </Label>
        <TextField
          className="w-full"
          placeholder="Fail message"
          {...register(`failMessage`, { required: true })}
        />
        <Label
          name="successMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Success message
        </Label>
        <TextField
          className="w-full"
          placeholder="Success message"
          {...register(`successMessage`, { required: true })}
        />
        <Label
          name="typeLabel"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Step Type
        </Label>
        <div className="select-field-items">
          <SelectField
            name="stepType"
            validation={{ required: true }}
            onChange={(e) => {
              setValue(
                'stepType',
                e.target.value as 'SIMPLE_TEXT' | 'NFT_CHECK' | undefined
              )
            }}
          >
            <option value="">Select a step type</option>
            <option value="SIMPLE_TEXT">Simple Text</option>
            <option value="NFT_CHECK">NFT Check</option>
          </SelectField>
        </div>

        {stepType === 'SIMPLE_TEXT' && <EditSimpleText value={value} />}

        {stepType === 'NFT_CHECK' && <EditNftCheck value={value} />}

        <Submit
          className="rw-button-group rw-button rw-button-blue"
          onClick={handleSubmit(onSubmit)}
        >
          Add Step to State
        </Submit>
        <button
          className="rw-button-group rw-button rw-button-blue"
          type="button"
          onClick={() => removeStep(index)}
        >
          Remove
        </button>
      </Form>
    </div>
  )
}

export default function PuzzleForm() {
  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsFieldArrayName]: [],
    },
  })

  const {
    fields: stepFields,
    append: appendStep,
    update: updateStep,
    remove: removeStep,
  } = useFieldArray({
    control: formMethods.control,
    name: stepsFieldArrayName,
  })

  const renderCount = useRef(1)

  const onSubmit = (data: PuzzleFormType) => {
    console.log(data)
  }

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
            <Form formMethods={formMethods} onSubmit={onSubmit}>
              <div className="max-w-3xl">
                <h2 className="my-8 text-4xl font-bold">Create a Puzzle</h2>
                <Label
                  name="name"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Name
                </Label>

                <TextField
                  name="name"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <Label
                  name="slug"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Slug
                </Label>

                <TextField
                  name="slug"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />
              </div>

              <div className="rw-button-group"></div>
              {stepFields.map((field, index) => (
                <fieldset key={field.id}>
                  <EditStep
                    control={formMethods.control}
                    updateStep={updateStep}
                    removeStep={removeStep}
                    index={index}
                    value={field}
                  />
                </fieldset>
              ))}

              <div className="rw-button-group">
                <button
                  type="button"
                  className="rw-button rw-button-blue"
                  onClick={() => {
                    appendStep({
                      failMessage: '',
                      successMessage: '',
                      stepType: undefined,
                      solution: '',
                      contractAddress: '',
                      chainId: '',
                    })
                  }}
                >
                  Add Step
                </button>
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
