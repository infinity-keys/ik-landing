// This page is temporary, just to test out the form
// BROWSER LOCATION: http://localhost:8910/puzzle/archetype

let useEffect: typeof import('react').useEffect
let useRef: typeof import('react').useRef

if (process.env.NODE_ENV === 'development') {
  import('react').then((React) => {
    useEffect = React.useEffect
    useRef = React.useRef
  })
}

import { DevTool } from '@hookform/devtools'
import {
  CreateRewardableInput,
  MutationcreateBurdPuzzleArgs,
  CreateBurdPuzzleMutation,
} from 'types/graphql'
// import { CreateStepInput } from 'types/graphql'

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
  UseFormSetValue,
  UseFormGetValues,
  CheckboxField,
  NumberField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_BURD_PUZZLE_MUTATION = gql`
  mutation CreateBurdPuzzleMutation($input: CreateRewardableInput!) {
    createBurdPuzzle(input: $input) {
      name
    }
  }
`

const stepsArrayName = 'steps'

// const startingSteps: Step[] = [{ message: 'step 1' }, { message: 'step 2' }]
const startingSteps: Step[] = []

type StepType = 'SIMPLE_TEXT' | 'NFT_CHECK' | 'UNCHOSEN'

type Step = {
  failMessage: string
  successMessage: string
  challenge: string
  resourceLinks: string
  stepSortWeight: string
  type: StepType
}

type StepSimpleText = Step & {
  type: 'SIMPLE_TEXT'
  solution: string
}

type StepNftCheck = Step & {
  type: 'NFT_CHECK'
  nftId: string // this needs to be replaced with the values below
  // contractAddress: string
  // chainId: string
  // tokenId: string
  // poapEventId: string
}

function Step({
  index,
  register,
  watch,
  setValue,
  getValues,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  watch: UseFormWatch<PuzzleFormType> // linting error: UseFormWatch<CreateBurdPuzzleInput>
  setValue: UseFormSetValue<PuzzleFormType>
  getValues: UseFormGetValues<PuzzleFormType>
}) {
  // Watch for select val changing
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  useEffect(() => {
    if (stepTypeVal === 'SIMPLE_TEXT') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'SIMPLE_TEXT',
        failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
        successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
        challenge: getValues(`${stepsArrayName}.${index}.challenge`),
        resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
        stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
        solution: '',
      })
    }
    if (stepTypeVal === 'NFT_CHECK') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'NFT_CHECK',
        failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
        successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
        challenge: getValues(`${stepsArrayName}.${index}.challenge`),
        resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
        stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
        nftId: '', // this needs to be replaced with the values below
        // contractAddress: '',
        // chainId: '',
        // tokenId: '',
        // poapEventId: '',
      })
    }
  }, [index, setValue, getValues, stepTypeVal])

  return (
    <fieldset className="text-stone-100">
      <Label
        name="failMesssage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Fail Message
      </Label>
      <TextField
        placeholder="Fail Message"
        {...register(`${stepsArrayName}.${index}.failMessage`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="successMessage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Success Message
      </Label>
      <TextField
        placeholder="Success Message"
        {...register(`${stepsArrayName}.${index}.successMessage`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="challenge"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Challenge
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.challenge`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="resourceLinks"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Resource Links
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.resourceLinks`)}
        className="block bg-inherit text-stone-100"
      />

      <Label
        name="stepSortWeight"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Step Sort Weight
      </Label>
      <NumberField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
        className="block bg-inherit text-stone-100"
      />
      <div className="text-stone-800">
        <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
          <option value="UNCHOSEN">Choose a Step Type</option>
          <option value="SIMPLE_TEXT">Simple Text</option>
          <option value="NFT_CHECK">NFT check</option>
        </SelectField>
      </div>

      {stepTypeVal === 'UNCHOSEN' && (
        <h1>
          <br></br>
        </h1>
      )}

      {stepTypeVal === 'SIMPLE_TEXT' && (
        <TextField
          placeholder="Solution"
          {...register(`${stepsArrayName}.${index}.solution`)}
          className="block bg-inherit text-stone-100"
        />
      )}

      {/*
      this ".nftId" below needs to be replaced with these values:
      1.) contractAddress
      2.) chainId
      3.) tokenId
      4.) poapEventId
      */}
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
  rewardable: {
    name: CreateRewardableInput['name']
    slug: CreateRewardableInput['slug']
    explanation: CreateRewardableInput['explanation']
    successMessage: CreateRewardableInput['successMessage']
    listPublicly: CreateRewardableInput['listPublicly']
  }
  steps: (StepSimpleText | StepNftCheck | Step)[]
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

  const onSubmit = async (input: PuzzleFormType) => {
    createArchetypalPuzzle({
      variables: {
        input: {
          name: input.rewardable.name,
          explanation: input.rewardable.explanation,
          type: 'PUZZLE', // hard coded for now
          slug: input.rewardable.slug,
          listPublicly: input.rewardable.listPublicly,
          orgId: 'bacnend shall handle this!', // hard coded for now
          puzzle: {
            isAnon: false,
            rewardableId: 'ignore me',
            steps: input.steps.map((step) => {
              const commonStepFields = {
                puzzleId: 'ignore me',
                failMessage: step.failMessage,
                successMessage: step.successMessage,
                challenge: step.challenge,
                stepSortWeight: parseInt(step.stepSortWeight, 10),
                resourceLinks: step.resourceLinks,
              }
              if (step.type === 'SIMPLE_TEXT' && 'solution' in step) {
                return {
                  type: 'SIMPLE_TEXT', // discriminator
                  ...commonStepFields,
                  stepSimpleText: {
                    stepId: 'ignore me',
                    solution: step.solution,
                    solutionCharCount: step.solution.length,
                  },
                }
              }
              // else if (step.type === 'NFT_CHECK') {
              //   return {
              //     type: 'NFT_CHECK', // discriminator
              //     ...commonStepFields,
              //     stepNftCheck: {
              //       stepId: 'ignore me',
              //       requireAllNfts: false, // hard coded for now
              //       nftCheckData: {
              //       step.stepNftCheck.nftCheckData.map((nftCheckDatum) => {
              //         return {
              //           contractAddress: nftCheckDatum.contractAddress,
              //           tokenId: nftCheckDatum.tokenId,
              //           chainId: nftCheckDatum.chainId,
              //           poapEventId: nftCheckDatum.poapEventId,
              //         },
              //       })
              //     },
              //   }
              // }
              else {
                throw new Error('Step type not recognized')
              }
            }),
          },
        },
      },
    })
    console.log(input)
  }

  const [createArchetypalPuzzle] = useMutation<
    CreateBurdPuzzleMutation,
    MutationcreateBurdPuzzleArgs
  >(CREATE_BURD_PUZZLE_MUTATION, {
    onCompleted: (data) => {
      console.log(data.createBurdPuzzle)
      alert(`Rewardable created via Burd's Form!`)
    },
    onError: (error) => {
      alert(`Error with Burd's form: ${error.message}`)
    },
  })

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
        Times this component has rendered: <b>{renderCount.current}</b>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={formMethods.control} />
      )}
      <Label
        name="rewardable.name"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Name
      </Label>
      <TextField
        name="rewardable.name"
        className="block bg-inherit text-stone-100"
        placeholder="Name"
      />

      <Label
        name="rewardable.slug"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Slug
      </Label>
      <TextField
        name="rewardable.slug"
        className="block bg-inherit text-stone-100"
        placeholder="Slug"
      />

      <Label
        name="rewardable.explanation"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Explanation
      </Label>
      <TextField
        name="rewardable.explanation"
        className="block bg-inherit text-stone-100"
        placeholder="Explanation"
      />

      <Label
        name="rewardable.successMessage"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Success Message
      </Label>
      <TextField
        name="rewardable.successMessage"
        className="block bg-inherit text-stone-100"
        placeholder="Success Message"
      />

      <Label
        name="rewardable.orgId"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Org Id
      </Label>
      <TextField
        name="rewardable.orgId"
        className="block bg-inherit text-stone-100"
        defaultValue={'cla9yay7y003k08la2z4j2xrv'}
      />

      <Label
        name="rewardable.listPublicly"
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        List Publicly
      </Label>
      <CheckboxField
        name="rewardable.listPublicly"
        className="block bg-inherit text-stone-100"
      />
      <h1 className="mt-8">Steps go below this line _______________</h1>

      {fields.map((field, index) => (
        <Step
          index={index}
          register={formMethods.register}
          key={field.id}
          watch={formMethods.watch}
          setValue={formMethods.setValue}
          getValues={formMethods.getValues}
        />
      ))}

      <div className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-blue"
          onClick={() =>
            append({
              type: 'UNCHOSEN',
              failMessage: '',
              successMessage: '',
              challenge: '',
              resourceLinks: '',
              stepSortWeight: '',
            })
          }
        >
          Add Step
        </button>
      </div>
      <Submit>Submit</Submit>
    </Form>
  )
}
