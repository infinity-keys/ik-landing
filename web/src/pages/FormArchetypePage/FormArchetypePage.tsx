// This page is temporary, just to test out the form
// BROWSER LOCATION: http://localhost:8910/puzzle/archetype

// only used in dev mode
let useEffect: typeof import('react').useEffect
let useRef: typeof import('react').useRef

// only used in dev mode
if (process.env.NODE_ENV === 'development') {
  ;({ useRef, useEffect } = require('react'))
}

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  SelectField,
  Submit,
  TextField,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from '@redwoodjs/forms'

// const ADD_ARCHETYPAL_PUZZLE = gql`
//   mutation AddArchetypalPuzzle {
//     addArchetypalPuzzle {
//       name
//     }
//   }
// `

const stepsArrayName = 'stepsArray'

// const startingSteps: Step[] = [{ message: 'step 1' }, { message: 'step 2' }]
const startingSteps: Step[] = []

type StepType = 'SIMPLE_TEXT' | 'NFT_CHECK' // | undefined ?

type Step = {
  failMessage: string
  type: StepType | undefined
}

type StepSimpleText = Step & {
  type: 'SIMPLE_TEXT'
  solution: string
}

type StepNftCheck = Step & {
  type: 'NFT_CHECK'
  nftId: string
}

function Step({
  index,
  register,
  watch,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  watch: UseFormWatch<PuzzleFormType>
}) {
  // Watch for select val changing
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  return (
    <fieldset className="flex text-stone-100">
      <TextField
        placeholder="Fail Message"
        {...register(`${stepsArrayName}.${index}.failMessage`)}
        className="block bg-inherit text-stone-100"
      />
      <div className="text-stone-800">
        <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
          {/* This default on the dropdown is not working */}
          <option>Choose a Step Type</option>
          <option value="SIMPLE_TEXT">Simple Text</option>
          <option value="NFT_CHECK">NFT check</option>
        </SelectField>
      </div>

      {stepTypeVal === 'SIMPLE_TEXT' && (
        <TextField
          placeholder="Solution"
          {...register(`${stepsArrayName}.${index}.solution`)}
          className="block bg-inherit text-stone-100"
        />
      )}

      {stepTypeVal === 'NFT_CHECK' && (
        <TextField
          placeholder="NFT ID"
          {...register(`${stepsArrayName}.${index}.nftId`)}
          className="block bg-inherit"
        />
      )}
    </fieldset>
  )
}

type PuzzleFormType = {
  name: string
  slug: string
  stepsArray: (StepSimpleText | StepNftCheck)[]
}

export default function PuzzleForm() {
  // only used in dev mode
  const renderCount = useRef(1)
  // only used in dev mode
  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsArrayName]: startingSteps,
    },
  })

  const { fields, append } = useFieldArray({
    control: formMethods.control,
    name: stepsArrayName,
  })

  const onSubmit = (data: PuzzleFormType) => {
    console.log(data)
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        Times this component has rendered: <b>{renderCount.current}</b>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={formMethods.control} />
      )}
      <Label
        name="name"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Name
      </Label>
      <TextField
        name="name"
        className="block bg-inherit text-stone-100"
        placeholder="name"
      />
      <TextField
        name="slug"
        className="block bg-inherit text-stone-100"
        placeholder="slug"
      />

      <h1 className="mt-8">Steps go below</h1>

      {fields.map((field, index) => (
        <Step
          index={index}
          register={formMethods.register}
          key={field.id}
          watch={formMethods.watch}
        />
      ))}

      <div className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-blue"
          onClick={() =>
            append({ type: 'SIMPLE_TEXT', failMessage: '', solution: '' })
          }
        >
          Add Step
        </button>
      </div>
      <Submit>Submit</Submit>
    </Form>
  )
}

// PROBLEM
// Here's the return value of the console logged 'data':

// name : "1"
// slug : "2"
// stepsArray : Array(2)
// 0 : {type: 'NFT_CHECK', failMessage: '3', solution: '', nftId: '4'}
// 1 : {type: 'SIMPLE_TEXT', failMessage: '5', solution: '6'}
// length : 2

// The problem here is that the first item in the array (0) should not have a 'solution' property,
// just as the second item in the array (1) does not have a 'nftId' property.
