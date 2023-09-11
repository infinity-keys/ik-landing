// BROWSER LOCATION: http://localhost:8910/puzzle/archetype
// web/src/pages/FormArchetypePage/FormArchetypePage.tsx

// provides type safety by explicitly stating the type of each hook
let useEffect: typeof import('react').useEffect
let useRef: typeof import('react').useRef
let useState: typeof import('react').useState

if (process.env.NODE_ENV === 'development') {
  import('react').then((React) => {
    useEffect = React.useEffect
    useRef = React.useRef
    useState = React.useState

    // Slight delay to allow 'useRef()' to initialize, w/o it we get a warning
    // in the browser that says: "'useRef' is not a function."
    setTimeout(() => {}, 50)
  })
}

import { DevTool } from '@hookform/devtools'
import {
  CreateRewardableInput,
  MutationcreateBurdPuzzleArgs,
  CreateBurdPuzzleMutation,
  OriumCheckType,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldErrors,
  useForm,
  UseFormReturn,
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

const startingSteps: Step[] = []

type StepType =
  | 'SIMPLE_TEXT'
  | 'NFT_CHECK'
  | 'FUNCTION_CALL'
  | 'COMETH_API'
  | 'TOKEN_ID_RANGE'
  | 'ORIUM_API'
  | 'UNCHOSEN'

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
  requireAllNfts: boolean
  nftCheckData: NftCheckDatum
}

// we tried importing this directly from 'types/graphql'
// but that generated several linting errors below
type NftCheckDatum = {
  contractAddress: string
  chainId: string
  tokenId: string
  poapEventId: string
}

type StepFunctionCall = Step & {
  type: 'FUNCTION_CALL'
  methodIds: string[]
  contractAddress: string
}

type StepComethApi = Step & {
  type: 'COMETH_API'
  stepId: string
}

type StepTokenIdRange = Step & {
  type: 'TOKEN_ID_RANGE'
  stepId: string
  contractAddress: string
  chainId: string
  startIds: number[]
  endIds: number[]
}

type StepOriumApi = Step & {
  type: 'ORIUM_API'
  stepId: string
  // OriumCheckType is imported from 'types/graphql'
  checkType: OriumCheckType
}

// Bloom says to look into react-hook-forms "field validators" and use those,
// Using this default: <FieldError /> from react-hook-form creates cryptic (for
// user) error messages like this one: "steps.1.failMessage is required"
// thus we have a custom error message function instead so as to not confuse users.
// NOTE: this is in parent scope & is used in both the 'Puzzle' and 'Step' forms
function requiredFieldError(fieldName: string) {
  return (
    <div className="rw-field-error">
      I&apos;m sorry, but {fieldName} is required!
    </div>
  )
}

function Step({
  index,
  register,
  watch,
  setValue,
  getValues,
  remove,
  errors,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  // creates linting error: UseFormWatch<CreateBurdPuzzleInput>
  watch: UseFormWatch<PuzzleFormType>
  setValue: UseFormSetValue<PuzzleFormType>
  getValues: UseFormGetValues<PuzzleFormType>
  remove: (index: number) => void
  errors: FieldErrors<PuzzleFormType>
}) {
  // Watch for select val changing
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  useEffect(() => {
    const commonStepFields = {
      failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
      successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
      challenge: getValues(`${stepsArrayName}.${index}.challenge`),
      resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
      stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
    }
    if (stepTypeVal === 'SIMPLE_TEXT') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'SIMPLE_TEXT',
        ...commonStepFields,
        solution: '',
      })
    }
    if (stepTypeVal === 'NFT_CHECK') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'NFT_CHECK',
        ...commonStepFields,
        requireAllNfts: false,
        nftCheckData: {
          contractAddress: '',
          tokenId: '',
          chainId: '',
          poapEventId: '',
        },
      })
    }
    if (stepTypeVal === 'FUNCTION_CALL') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'FUNCTION_CALL',
        ...commonStepFields,
        methodIds: [],
        contractAddress: '',
      })
    }
    if (stepTypeVal === 'COMETH_API') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'COMETH_API',
        ...commonStepFields,
        stepId: '',
      })
    }
    if (stepTypeVal === 'TOKEN_ID_RANGE') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'TOKEN_ID_RANGE',
        ...commonStepFields,
        stepId: '',
        contractAddress: '',
        chainId: '',
        startIds: [],
        endIds: [],
      })
    }
  }, [index, setValue, getValues, stepTypeVal])

  // We want to grab the enum OriumCheckType from 'types/graphql'
  // but when we do that we get a linting error so the three options are
  // re-declared in this constant below to make TypeScript happy
  const oriumCheckTypeOptions = [
    'HAS_CREATED_VAULT',
    'HAS_DEPOSITED_NFT',
    'HAS_CREATED_SCHOLARSHIP',
  ]

  return (
    <fieldset className="text-stone-100">
      <Label
        name={`failMesssage.${index}`}
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Fail Message
      </Label>
      <TextField
        placeholder="Fail Message"
        {...register(`${stepsArrayName}.${index}.failMessage`)}
        className="block bg-inherit text-stone-100"
        validation={{ required: true }}
      />
      {errors[stepsArrayName]?.[index]?.failMessage?.type === 'required' &&
        requiredFieldError('Fail Message')}
      {/*
        This is the react-hook-form default but it returns this message:
          "steps.1.failMessage is required" - but the user won't know WTF that means
        <FieldError
          name={`${stepsArrayName}.${index}.failMessage`}
          className="rw-field-error"
        />
      */}
      <Label
        name={`successMessage.${index}`}
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Success Message
      </Label>
      <TextField
        placeholder="Success Message"
        {...register(`${stepsArrayName}.${index}.successMessage`)}
        className="block bg-inherit text-stone-100"
        validation={{ required: true }}
      />
      {errors[stepsArrayName]?.[index]?.successMessage?.type === 'required' &&
        requiredFieldError('Success Message')}

      <Label
        name={`challenge.${index}`}
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Challenge
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.challenge`)}
        className="block bg-inherit text-stone-100"
        validation={{ required: true }}
      />
      {errors[stepsArrayName]?.[index]?.challenge?.type === 'required' &&
        requiredFieldError('Challenge')}

      <Label
        name={`resourceLinks.${index}`}
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Resource Links
      </Label>
      <TextField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.resourceLinks`)}
        className="block bg-inherit text-stone-100"
        validation={{ required: true }}
      />
      {errors[stepsArrayName]?.[index]?.resourceLinks?.type === 'required' &&
        requiredFieldError('Resource Links')}

      <Label
        name={`stepSortWeight.${index}`}
        className="rw-label text-stone-100"
        errorClassName="rw-label rw-label-error"
      >
        Step Sort Weight
      </Label>
      <NumberField
        placeholder="Challenge"
        {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
        className="block bg-inherit text-stone-100"
        validation={{ required: true }}
      />
      {errors[stepsArrayName]?.[index]?.stepSortWeight?.type === 'required' &&
        requiredFieldError('Step Sort Weight')}

      <div className="text-stone-800">
        <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
          <option value="UNCHOSEN">Choose a Step Type</option>
          <option value="SIMPLE_TEXT">Simple Text</option>
          <option value="NFT_CHECK">NFT check</option>
          <option value="FUNCTION_CALL">Function Call</option>
          <option value="COMETH_API">Cometh API</option>
          <option value="TOKEN_ID_RANGE">Token ID Range</option>
          <option value="ORIUM_API">Orium API</option>
        </SelectField>
      </div>

      {stepTypeVal === 'UNCHOSEN' && (
        <h1>
          <br></br>
        </h1>
      )}

      {stepTypeVal === 'SIMPLE_TEXT' && (
        <div>
          <TextField
            placeholder="Solution"
            {...register(`${stepsArrayName}.${index}.solution`)}
            className="block bg-inherit text-stone-100"
            validation={{ required: true }}
          />
          {/* // left off here; this error message works, but it has a linting error */}
          {/* {errors[stepsArrayName]?.[index]?.solution?.type === 'required' &&
            requiredFieldError('a solution for the simple text')} */}
        </div>
      )}

      {stepTypeVal === 'NFT_CHECK' && (
        <div>
          <Label
            name="requireAllNfts"
            className="rw-label text-stone-100"
            errorClassName="rw-label rw-label-error"
          >
            Require All NFTs
          </Label>
          <CheckboxField
            {...register(`${stepsArrayName}.${index}.requireAllNfts`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Contract Address"
            {...register(
              `${stepsArrayName}.${index}.nftCheckData.contractAddress`
            )}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Chain Id"
            {...register(`${stepsArrayName}.${index}.nftCheckData.chainId`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Token Id"
            {...register(`${stepsArrayName}.${index}.nftCheckData.tokenId`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="POAP Event Id"
            {...register(`${stepsArrayName}.${index}.nftCheckData.poapEventId`)}
            className="block bg-inherit text-stone-100"
          />
        </div>
      )}

      {stepTypeVal === 'FUNCTION_CALL' && (
        <div>
          <TextField
            placeholder="Method Ids"
            {...register(`${stepsArrayName}.${index}.methodIds`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Contract Address"
            {...register(`${stepsArrayName}.${index}.contractAddress`)}
            className="block bg-inherit text-stone-100"
          />
        </div>
      )}

      {stepTypeVal === 'COMETH_API' && (
        <div>
          <TextField
            placeholder="Step Id"
            {...register(`${stepsArrayName}.${index}.stepId`)}
            className="block bg-inherit text-stone-100"
          />
        </div>
      )}

      {stepTypeVal === 'TOKEN_ID_RANGE' && (
        <div>
          <TextField
            placeholder="Step Id"
            {...register(`${stepsArrayName}.${index}.stepId`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Contract Address"
            {...register(`${stepsArrayName}.${index}.contractAddress`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Chain Id"
            {...register(`${stepsArrayName}.${index}.chainId`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="Start Ids"
            {...register(`${stepsArrayName}.${index}.startIds`)}
            className="block bg-inherit text-stone-100"
          />
          <TextField
            placeholder="End Ids"
            {...register(`${stepsArrayName}.${index}.endIds`)}
            className="block bg-inherit text-stone-100"
          />
        </div>
      )}

      {stepTypeVal === 'ORIUM_API' && (
        <div>
          <TextField
            placeholder="Step Id"
            {...register(`${stepsArrayName}.${index}.stepId`)}
            className="block bg-inherit text-stone-100"
          />
          <label
            htmlFor={`${stepsArrayName}.${index}.checkType`}
            className="rw-label text-stone-100"
          >
            Check Type
          </label>
          <SelectField
            name={`${stepsArrayName}.${index}.checkType`}
            className="block bg-inherit text-stone-100"
          >
            {oriumCheckTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </div>
      )}
      <button
        type="button"
        className="rw-button rw-button-red"
        onClick={() => remove(index)}
      >
        Delete this Step
      </button>
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
  steps: (
    | StepSimpleText
    | StepNftCheck
    | StepFunctionCall
    | StepComethApi
    | StepTokenIdRange
    | StepOriumApi
    | Step
  )[]
}

export default function PuzzleForm() {
  // manages what happens when a user forgets to include at least one step for
  // the puzzle that they are creating with this form
  const [hasNoSteps, setHasNoSteps] = useState(false)

  // only used in dev mode
  const renderCount = useRef(process.env.NODE_ENV === 'development' ? 1 : 0)

  // only used in dev mode
  useEffect(() => {
    {
      process.env.NODE_ENV === 'development' &&
        (renderCount.current = renderCount.current + 1)
    }
  })

  const formMethods: UseFormReturn<PuzzleFormType> = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsArrayName]: startingSteps,
    },
  })

  const { errors } = formMethods.formState as {
    errors: FieldErrors<PuzzleFormType>
  }

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: stepsArrayName,
  })

  const onSubmit = async (input: PuzzleFormType) => {
    if (input.steps.length === 0) {
      // alternatively, we could trash the useState and just have an alert:
      // alert('A new puzzle must have at least one step!')
      setHasNoSteps(true)
      return
    }

    // Reset the error state if there are steps
    setHasNoSteps(false)

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
              } else if (step.type === 'NFT_CHECK' && 'nftCheckData' in step) {
                return {
                  type: 'NFT_CHECK', // discriminator
                  ...commonStepFields,
                  stepNftCheck: {
                    stepId: 'ignore me',
                    requireAllNfts: false, // hard coded for now
                    nftCheckData: [
                      {
                        contractAddress: step.nftCheckData.contractAddress,
                        chainId: parseInt(step.nftCheckData.chainId),
                        tokenId: parseInt(step.nftCheckData.tokenId),
                        poapEventId: step.nftCheckData.poapEventId,
                        stepNftCheckId: 'ignore me',
                      },
                    ],
                  },
                }
              } else if (step.type === 'FUNCTION_CALL' && 'methodIds' in step) {
                return {
                  type: 'FUNCTION_CALL', // discriminator
                  ...commonStepFields,
                  stepFunctionCall: {
                    stepId: 'ignore me',
                    methodIds: step.methodIds,
                    contractAddress: step.contractAddress,
                  },
                }
              } else if (step.type === 'COMETH_API' && 'stepId' in step) {
                return {
                  type: 'COMETH_API', // discriminator
                  ...commonStepFields,
                  stepComethApi: {
                    stepId: 'ignore me',
                  },
                }
              } else if (
                step.type === 'TOKEN_ID_RANGE' &&
                'startIds' in step &&
                'endIds' in step
              ) {
                return {
                  type: 'TOKEN_ID_RANGE', // discriminator
                  ...commonStepFields,
                  stepTokenIdRange: {
                    stepId: 'ignore me',
                    contractAddress: step.contractAddress,
                    chainId: step.chainId,
                    startIds: step.startIds.map(Number),
                    endIds: step.endIds.map(Number),
                  },
                }
              } else if (
                step.type === 'ORIUM_API' &&
                'stepId' in step &&
                'checkType' in step
              ) {
                return {
                  type: 'ORIUM_API', // discriminator
                  ...commonStepFields,
                  stepOriumApi: {
                    stepId: 'ignore me',
                    checkType: step.checkType,
                  },
                }
              } else {
                throw new Error('Step type not recognized')
              }
            }),
          },
        },
      },
    })
    console.log(input)
  }

  const [createArchetypalPuzzle, { loading, error }] = useMutation<
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

  // This checks to see if the slug is formatted correctly
  function requiredSlugFormatError(slug: string) {
    const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

    if (!slugPattern.test(slug)) {
      return (
        <div className="rw-field-error">
          I&apos;m sorry, but {slug} is not a valid slug; use lowercase letters
          and/or numbers seperated by dashes
        </div>
      )
    }
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      {process.env.NODE_ENV === 'development' && (
        <div>
          <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
            Times this component has rendered: <b>{renderCount.current}</b>
          </div>
          <DevTool control={formMethods.control} />
        </div>
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
        validation={{ required: true }}
      />
      {/*
        This is the react-hook-form default but it returns this message:
          "rewardable.name is required" - but the user won't know WTF that means
        <FieldError name="rewardable.name" className="rw-field-error" />
      */}
      {errors.rewardable?.name?.type === 'required' &&
        requiredFieldError('a Name')}

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
        placeholder="a Slug"
        validation={{ required: true }}
      />
      {errors.rewardable?.slug?.type === 'required' &&
        requiredFieldError('Slug')}
      {requiredSlugFormatError(formMethods.getValues('rewardable.slug'))}

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
        validation={{ required: true }}
      />
      {errors.rewardable?.explanation?.type === 'required' &&
        requiredFieldError('an Explanation')}

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
        validation={{ required: true }}
      />
      {errors.rewardable?.successMessage?.type === 'required' &&
        requiredFieldError('an Explanation')}

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
        // TODO: Currently this is hardwired to IK's Org ID, but it needs
        // to eventually say something like this for version 1.0:
        // if (currentUser.organizations?.id.includes('cla9yay7y003k08la2z4j2xrv')) {
        //   defaultValue={'cla9yay7y003k08la2z4j2xrv'}
        // } else { defaultValue={''} }
        defaultValue={'cla9yay7y003k08la2z4j2xrv'}
        validation={{ required: true }}
      />
      {errors.rewardable?.successMessage?.type === 'required' &&
        requiredFieldError('an Organizational ID')}

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
          remove={remove}
          errors={errors}
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

      {/* Conditionally render the error message */}
      {hasNoSteps && (
        <div className="rw-field-error">
          You must have at least one step in a puzzle!
        </div>
      )}

      <Submit disabled={loading} className="rw-button rw-button-blue">
        Submit
      </Submit>
    </Form>
  )
}
