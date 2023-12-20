// BROWSER LOCATION: http://localhost:8910/puzzle/archetype

import { useState, useRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import {
  CreateRewardableInput,
  MutationcreateBurdPuzzleArgs,
  CreateBurdPuzzleMutation,
  CreateStepInput,
  CreateStepSimpleTextInput,
  CreateStepNftCheckInput,
  CreateStepFunctionCallInput,
  CreateStepComethApiInput,
  CreateStepTokenIdRangeInput,
  CreateStepOriumApiInput,
  CreatePuzzleInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldErrors,
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

// left off here on 12/20/2023
type TokenIdRangeFormType = {
  type: 'TOKEN_ID_RANGE'
  ranges: {
    startId: number
    endId: number
  }[]
}

// // alternate type definition for the Token ID Range that matches the
// // PuzzleFormType type definition below
// type TokenIdRangeFormType = {
//   contractAddress: CreateStepTokenIdRangeInput['contractAddress'] extends number
//     ? number
//     : never
//   chainId: CreateStepTokenIdRangeInput['chainId'] extends number
//     ? number
//     : never
//   startIds: CreateStepTokenIdRangeInput['startIds'] extends number[]
//     ? number[]
//     : never
//   endIds: CreateStepTokenIdRangeInput['endIds'] extends number[]
//     ? number[]
//     : never
// }

const CREATE_BURD_PUZZLE_MUTATION = gql`
  mutation CreateBurdPuzzleMutation($input: CreateRewardableInput!) {
    createBurdPuzzle(input: $input) {
      name
    }
  }
`

// TypeScript omit to ignore the parent `puzzleId` field
type CreateStepInputFrontEnd = Omit<CreateStepInput, 'puzzleId'>

// Handles all the different types of steps [stepType] that can be created
type CreateAllStepTypesInput =
  | (CreateStepInputFrontEnd & Omit<CreateStepSimpleTextInput, 'stepId'>)
  | (CreateStepInputFrontEnd & Omit<CreateStepNftCheckInput, 'stepId'>)
  | (CreateStepInputFrontEnd & Omit<CreateStepFunctionCallInput, 'stepId'>)
  | (CreateStepInputFrontEnd & Omit<CreateStepComethApiInput, 'stepId'>)
  | (CreateStepInputFrontEnd & {
      // left off here on 12/20/2023
      ranges: { startId: number; endId: number }[]
    } & Omit<CreateStepTokenIdRangeInput, 'stepId'>)
  | (CreateStepInputFrontEnd & Omit<CreateStepOriumApiInput, 'stepId'>)

// Set as a constant in case we need to change this string value later on
const stepsArrayName = 'steps'

// New puzzles start with no steps in an empty array
const startingSteps: CreateAllStepTypesInput[] = []

// Using the default: <FieldError /> field validator from react-hook-form creates
// cryptic (for the user) error messages like this: "steps.1.failMessage is required"
// because the default field validator is not configured for nested arrays of objects
// thus we have a custom error message function instead so as to not confuse users.
// NOTE: this is in parent scope & is used in both the 'Puzzle' and 'Step' forms
function requiredFieldError(fieldName: string) {
  return (
    <div className="form__error pt-1 font-medium text-rose-800">
      I&apos;m sorry, but {fieldName} is required!
    </div>
  )
}

// These are used to style labels (<Label />) for nested components
const defaultStyles = 'form__label text-2xl font-bold text-slate-700'
const defaultTitleColor = 'text-slate-700'
const errorTitleColor = 'text-rose-900'

// This is the component that renders each token id range in
// each step in the form if the step has a type of 'TOKEN_ID_RANGE'
function TokenIdRangeForm({
  index,
  register,
  remove,
  errors,
}: {
  index: number
  register: UseFormRegister<TokenIdRangeFormType>
  remove: (index: number) => void
  errors: FieldErrors<TokenIdRangeFormType>
}) {
  return (
    <fieldset>
      <div className="mb-8 rounded-lg border-2 border-gray-500 bg-gray-100 p-6">
        <div className="form__label mb-12 text-center text-3xl font-extrabold tracking-widest text-slate-700">
          Token ID Range {index + 1}
        </div>
        <div id="start-id" className="form__entry mb-12">
          <Label
            name={`startId.${index}`}
            className={`${defaultStyles} ${
              Array.isArray(errors[`ranges`]) &&
              'startId' in errors[`ranges`][index] &&
              'type' in errors[`ranges`][index].startId &&
              errors[`ranges`][index].startId.type === 'required'
                ? errorTitleColor
                : defaultTitleColor
            }`}

            // // Left off here on 12/20/2023
            // className={`${defaultStyles} ${
            //   Array.isArray(errors[`startIds`]) &&
            //   Array.isArray(errors[`startIds`][index]?.startId) &&
            //   errors[stepsArrayName][`startIds`].startIds.some(
            //     (startIdError) => startIdError.type === 'required'
            //   )
            //     ? errorTitleColor
            //     : defaultTitleColor
            // }`}
          >
            <div className="form__entry-name mb-1">Start ID</div>
          </Label>
          <TextField
            placeholder="Start ID"
            {...register(`ranges.${index}.startId`)}
            className="form__text-field mb-4 box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            validation={{ required: true }}
          />
          {errors[`ranges`]?.[index]?.startId?.type === 'required' &&
            requiredFieldError('a Start ID')}

          {/* Left off here on 12/20/2023 */}
          {/* {errors[stepsArrayName][index].startIds.some(
            (startIdError) => startIdError.type === 'required'
          ) && requiredFieldError('a Start ID')} */}
        </div>

        <div id="end-id" className="form__entry mb-12">
          <Label
            name={`endId.${index}`}
            className="form__label text-2xl font-bold text-slate-700"
            errorClassName="form__label--error text-2xl font-bold text-rose-900"
          >
            <div className="form__entry-name mb-1">End ID</div>
          </Label>
          <TextField
            placeholder="End ID"
            {...register(`ranges.${index}.endId`, { required: true })}
            className="form__text-field mb-4 box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          />
          {errors[`ranges`]?.[index]?.endId?.type === 'required' &&
            requiredFieldError('an End ID')}
        </div>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => {
            remove(index)
          }}
        >
          <div className="">Remove Token ID Range</div>
        </button>
      </div>
    </fieldset>
  )
}

// This is the component that renders each step in the puzzle form
function StepForm({
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
  watch: UseFormWatch<PuzzleFormType>
  setValue: UseFormSetValue<PuzzleFormType>
  getValues: UseFormGetValues<PuzzleFormType>
  remove: (index: number) => void
  errors: FieldErrors<PuzzleFormType>
}) {
  // Watch for `stepTypeVal` changes so that we can set the default values
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  // This is a custom hook that sets the default values for each step
  useEffect(() => {
    const commonStepFields = {
      failMessage: getValues(`${stepsArrayName}.${index}.failMessage`),
      successMessage: getValues(`${stepsArrayName}.${index}.successMessage`),
      challenge: getValues(`${stepsArrayName}.${index}.challenge`),
      resourceLinks: getValues(`${stepsArrayName}.${index}.resourceLinks`),
      stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
      solutionHint: getValues(`${stepsArrayName}.${index}.solutionHint`),
      defaultImage: getValues(`${stepsArrayName}.${index}.defaultImage`),
      solutionImage: getValues(`${stepsArrayName}.${index}.solutionImage`),
      stepGuideType: getValues(`${stepsArrayName}.${index}.stepGuideType`),
    }
    if (stepTypeVal === 'SIMPLE_TEXT') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'SIMPLE_TEXT',
        ...commonStepFields,
        solution: '',
        solutionCharCount: 0,
      })
    }
    if (stepTypeVal === 'NFT_CHECK') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'NFT_CHECK',
        ...commonStepFields,
        requireAllNfts: false,
        nftCheckData: [
          {
            contractAddress: '',
            tokenId: Number(''),
            chainId: Number(''),
            poapEventId: '',
          },
        ],
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
      })
    }
    if (stepTypeVal === 'TOKEN_ID_RANGE') {
      setValue(`${stepsArrayName}.${index}`, {
        type: 'TOKEN_ID_RANGE',
        ...commonStepFields,
        contractAddress: '',
        chainId: '',
        // startIds: [],
        // endIds: [],
        ranges: [],

        // left off here on 12/20/2023
        // contractAddress: 0, // Default value as a number
        // chainId: 0, // Default value as a number
        // startIds: [0], // Initialize as an array with a default number
        // endIds: [0], // Initialize as an array with a default number
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

  // left off here on 12/20/2023
  const formMethods = useForm<TokenIdRangeFormType>({
    defaultValues: {
      ranges: [
        {
          startId: 0,
          endId: 0,
        },
      ],
    },
  })

  const {
    fields: tokenIdFields,
    append,
    remove: tokenIdRemove,
  } = useFieldArray({
    control: formMethods.control,
    name: 'ranges',
  })

  // const formMethods = useForm<TokenIdRangeFormType>({
  //   defaultValues: {
  //     contractAddress: 0,
  //     chainId: 0,
  //     startIds: [0],
  //     endIds: [0],
  //   },
  // })

  // const {
  //   fields: startIdFields,
  //   append: appendStartId,
  //   remove: removeStartId,
  // } = useFieldArray({
  //   control: formMethods.control,
  //   name: 'startIds',
  // })

  // const {
  //   fields: endIdFields,
  //   append: appendEndId,
  //   remove: removeEndId,
  // } = useFieldArray({
  //   control: formMethods.control,
  //   name: 'endIds',
  // })

  return (
    <fieldset className="ik-child-form mb-8 rounded-lg border-2 border-gray-500 bg-zinc-100 p-4">
      <div className="form__label text-center text-4xl font-extrabold tracking-widest text-slate-700">
        Step {index + 1}
      </div>
      <div id="step-fail-message" className="form__entry mb-12">
        <Label
          name={`failMesssage.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.failMessage?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Fail Message</div>
        </Label>
        <TextField
          placeholder="Fail Message"
          {...register(`${stepsArrayName}.${index}.failMessage`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.failMessage?.type === 'required' &&
          requiredFieldError('Fail Message')}
      </div>
      <div id="step-success-message" className="form__entry mb-12">
        <Label
          name={`successMessage.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.successMessage?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Success Message</div>
        </Label>
        <TextField
          placeholder="Success Message"
          {...register(`${stepsArrayName}.${index}.successMessage`)}
          className={`form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400`}
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.successMessage?.type === 'required' &&
          requiredFieldError('Success Message')}
      </div>
      <div id="step-challenge" className="form__entry mb-12">
        <Label
          name={`challenge.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.challenge?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Challenge</div>
        </Label>
        <TextField
          placeholder="Challenge"
          {...register(`${stepsArrayName}.${index}.challenge`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.challenge?.type === 'required' &&
          requiredFieldError('Challenge')}
      </div>
      <div id="step-resource-links" className="form__entry mb-12">
        <Label
          name={`resourceLinks.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.resourceLinks?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Resource Links</div>
        </Label>
        <TextField
          placeholder="Resource Links"
          {...register(`${stepsArrayName}.${index}.resourceLinks`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.resourceLinks?.type === 'required' &&
          requiredFieldError('Resource Links')}
      </div>

      <div id="solution-hint" className="form__entry mb-12">
        <Label
          name={`solutionHint.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.solutionHint?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Solution Hint</div>
        </Label>
        <TextField
          placeholder="Solution Hint"
          {...register(`${stepsArrayName}.${index}.solutionHint`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.solutionHint?.type === 'required' &&
          requiredFieldError('Solution Hint')}
      </div>

      <div id="default-image" className="form__entry mb-12">
        <Label
          name={`defaultImage.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.defaultImage?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Default Image</div>
        </Label>
        <TextField
          placeholder="Default Image"
          {...register(`${stepsArrayName}.${index}.defaultImage`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.defaultImage?.type === 'required' &&
          requiredFieldError('Default Image')}
      </div>

      <div id="solution-image" className="form__entry mb-12">
        <Label
          name={`solutionImage.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.solutionImage?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Solution Image</div>
        </Label>
        <TextField
          placeholder="Solution Image"
          {...register(`${stepsArrayName}.${index}.solutionImage`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.solutionImage?.type === 'required' &&
          requiredFieldError('Solution Image')}
      </div>

      <div id="step-sort-weight" className="form__entry mb-12">
        <Label
          name={`stepSortWeight.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.stepSortWeight?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">Step Sort Weight</div>
        </Label>
        <NumberField
          placeholder="Challenge"
          {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
          className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
          validation={{ required: true }}
        />
        {errors[stepsArrayName]?.[index]?.stepSortWeight?.type === 'required' &&
          requiredFieldError('Step Sort Weight')}
      </div>

      <div id="step-type-guide" className="form__entry mb-12">
        <Label
          name={`stepTypeGuide.${index}`}
          className="form__label text-2xl font-bold text-slate-700"
        >
          <div className="form__entry-name mb-1">Step Type Guide</div>
        </Label>
        <div className="my-8 text-stone-800">
          <SelectField
            {...register(`${stepsArrayName}.${index}.stepGuideType`)}
          >
            <option value="SEEK">Seek</option>
            <option value="INFER">Infer</option>
            <option value="REWIND">Rewind</option>
            <option value="TRACK">track</option>
            <option value="COLLECT">Collect</option>
            <option value="ACTIVATE">Activate</option>
          </SelectField>
        </div>
      </div>

      <div className="my-8 text-stone-800">
        <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
          <option>Choose a Step Type</option>
          <option value="SIMPLE_TEXT">Simple Text</option>
          <option value="NFT_CHECK">NFT check</option>
          <option value="FUNCTION_CALL">Function Call</option>
          <option value="COMETH_API">Cometh API</option>
          <option value="TOKEN_ID_RANGE">Token ID Range</option>
          <option value="ORIUM_API">Orium API</option>
        </SelectField>
      </div>
      {stepTypeVal === 'SIMPLE_TEXT' && (
        <div className="step__type">
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className={
                Array.isArray(errors[stepsArrayName]) &&
                'solution' in errors[stepsArrayName][index] &&
                'type' in errors[stepsArrayName][index].solution &&
                errors[stepsArrayName][index].solution.type === 'required'
                  ? `${defaultStyles} ${errorTitleColor}`
                  : `${defaultStyles} ${defaultTitleColor}`
              }
            >
              <div className="form__entry-name mb-1">Simple Text</div>
            </Label>
            <TextField
              placeholder="Simple Text"
              {...register(`${stepsArrayName}.${index}.solution`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              validation={{ required: true }}
            />
            {Array.isArray(errors[stepsArrayName]) &&
              'solution' in errors[stepsArrayName][index] &&
              'type' in errors[stepsArrayName][index].solution &&
              errors[stepsArrayName][index].solution.type === 'required' &&
              requiredFieldError('a simple text answer')}
          </div>
        </div>
      )}
      {stepTypeVal === 'NFT_CHECK' && (
        <div className="step__type">
          <div className="form__entry mb-12">
            <Label
              name="requireAllNfts"
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Require All NFTs</div>
            </Label>
            <CheckboxField
              {...register(`${stepsArrayName}.${index}.requireAllNfts`)}
              className="form__text-field mt-1 mb-10 box-border block bg-stone-200 text-slate-700"
            />
          </div>

          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(
                `${stepsArrayName}.${index}.nftCheckData.0.contractAddress`
              )}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Chain Id</div>
            </Label>
            <TextField
              placeholder="Chain Id"
              {...register(`${stepsArrayName}.${index}.nftCheckData.0.chainId`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Token Id</div>
            </Label>
            <TextField
              placeholder="Token Id"
              {...register(`${stepsArrayName}.${index}.nftCheckData.0.tokenId`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">POAP Event Id</div>
            </Label>
            <TextField
              placeholder="POAP Event Id"
              {...register(
                `${stepsArrayName}.${index}.nftCheckData.0.poapEventId`
              )}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
        </div>
      )}
      {stepTypeVal === 'FUNCTION_CALL' && (
        <div className="step__type">
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Method Ids</div>
            </Label>
            <TextField
              placeholder="Method Ids"
              {...register(`${stepsArrayName}.${index}.methodIds`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(`${stepsArrayName}.${index}.contractAddress`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
            />
          </div>
        </div>
      )}
      {stepTypeVal === 'COMETH_API' && (
        <div className="step__type">
          <div className="form__entry mb-12"></div>
        </div>
      )}
      {stepTypeVal === 'TOKEN_ID_RANGE' && (
        <div className="step__type">
          <div className="form__entry mb-12"></div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(`${stepsArrayName}.${index}.contractAddress`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              validation={{ required: true }}
            />
          </div>
          <div className="form__entry mb-12">
            <Label
              name={stepTypeVal}
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Chain Id</div>
            </Label>
            <TextField
              placeholder="Chain Id"
              {...register(`${stepsArrayName}.${index}.chainId`)}
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              validation={{ required: true }}
            />
          </div>

          <div id="dynamically-add-token-id-ranges" className="m-4 p-6">
            {tokenIdFields.map((field, index) => (
              <div key={field.id}>
                <p className="text-red-500">Index: {index}</p>
                <p className="text-red-500">ID: {field.id}</p>
                <TokenIdRangeForm
                  index={index}
                  register={formMethods.register}
                  key={field.id}
                  remove={tokenIdRemove}
                  errors={errors}
                />
              </div>
            ))}
            <div className="mt-8 mb-20">
              <button
                type="button"
                className="rw-button rw-button-blue"
                onClick={() =>
                  append({
                    startId: 0,
                    endId: 0,
                  })
                }
              >
                Add a Token ID Range
              </button>
            </div>
          </div>
        </div>
      )}
      {stepTypeVal === 'ORIUM_API' && (
        <div className="step__type">
          <div className="form__entry mb-12"></div>
          <label
            htmlFor={`${stepsArrayName}.${index}.checkType`}
            className="form__label text-2xl font-bold text-slate-700"
          >
            <div className="form__entry-name mb-1">Check Type</div>
          </label>
          <SelectField
            name={`${stepsArrayName}.${index}.checkType`}
            className="block bg-inherit font-semibold text-stone-700"
          >
            {oriumCheckTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </div>
      )}
      <div className="mt-16 flex justify-center">
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => remove(index)}
        >
          Delete this Step
        </button>
      </div>
    </fieldset>
  )
}

// This type definition is used in the PuzzleForm component below
// It does not get used in the Step component above
type PuzzleFormType = {
  rewardable: {
    name: CreateRewardableInput['name']
    slug: CreateRewardableInput['slug']
    explanation: CreateRewardableInput['explanation']
    successMessage: CreateRewardableInput['successMessage']
    listPublicly: CreateRewardableInput['listPublicly']
  }
  puzzle: {
    coverImage: CreatePuzzleInput['coverImage']
    requirements: CreatePuzzleInput['requirements']
  }
  steps: CreateAllStepTypesInput[]
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

  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsArrayName]: startingSteps,
    },
  })

  const { errors } = formMethods.formState
  console.log(errors)

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

    // debugger

    createArchetypalPuzzle({
      variables: {
        input: {
          name: input.rewardable.name,
          explanation: input.rewardable.explanation,
          type: 'PUZZLE', // hard coded for now
          slug: input.rewardable.slug,
          listPublicly: input.rewardable.listPublicly,
          orgId: 'backend shall handle this!', // hard coded for now
          // requirements: input.rewardable.requirements,
          // requirements: input.puzzle.requirements,
          puzzle: {
            rewardableId: 'ignore me',
            requirements: input.puzzle.requirements,
            coverImage: input.puzzle.coverImage,
            steps: input.steps.map((step) => {
              const commonStepFields = {
                puzzleId: 'ignore me',
                failMessage: step.failMessage,
                successMessage: step.successMessage,
                challenge: step.challenge,
                stepSortWeight: step.stepSortWeight,
                resourceLinks: step.resourceLinks,
                solutionHint: step.solutionHint,
                defaultImage: step.defaultImage,
                solutionImage: step.solutionImage,
                stepGuideType: step.stepGuideType,
              }
              if (step.type === 'SIMPLE_TEXT' && 'solution' in step) {
                return {
                  type: 'SIMPLE_TEXT',
                  ...commonStepFields,
                  stepSimpleText: {
                    stepId: 'ignore me',
                    solution: step.solution,
                    solutionCharCount: step.solution.length,
                  },
                }
              } else if (step.type === 'NFT_CHECK' && 'nftCheckData' in step) {
                return {
                  type: 'NFT_CHECK',
                  ...commonStepFields,
                  stepNftCheck: {
                    stepId: 'ignore me',
                    requireAllNfts: false, // hard coded for now
                    nftCheckData: step.nftCheckData.map((nftCheckData) => {
                      if (
                        nftCheckData.chainId === undefined ||
                        nftCheckData.tokenId === undefined ||
                        nftCheckData.chainId === null ||
                        nftCheckData.tokenId === null
                      ) {
                        throw new Error('No chainId or tokenId provided')
                      }

                      // @TODO: chainId and tokenId can be empty if POAP exists,
                      // REVISIT THIS!
                      return {
                        chainId: nftCheckData.chainId,
                        contractAddress: nftCheckData.contractAddress,
                        poapEventId: nftCheckData.poapEventId,
                        tokenId: nftCheckData.tokenId,
                        // stepNftCheckId: 'ignore me',
                      }
                    }),
                  },
                }
              } else if (step.type === 'FUNCTION_CALL' && 'methodIds' in step) {
                return {
                  type: 'FUNCTION_CALL',
                  ...commonStepFields,
                  stepFunctionCall: {
                    stepId: 'ignore me',
                    methodIds: step.methodIds,
                    contractAddress: step.contractAddress,
                  },
                }
              } else if (step.type === 'COMETH_API' && 'stepId' in step) {
                return {
                  type: 'COMETH_API',
                  ...commonStepFields,
                  stepComethApi: {
                    stepId: 'ignore me',
                  },
                }
              } else if (step.type === 'TOKEN_ID_RANGE' && 'ranges' in step) {
                // debugger
                return {
                  type: 'TOKEN_ID_RANGE',
                  ...commonStepFields,
                  stepTokenIdRange: {
                    stepId: 'ignore me',
                    contractAddress: step.contractAddress,
                    chainId: step.chainId,
                    // original placeholder values:
                    // startIds: step.startIds.map(Number),
                    // endIds: step.endIds.map(Number),

                    startIds: step.ranges.map((range) => range.startId),
                    endIds: step.ranges.map((range) => range.endId),
                  },
                }
              } else if (
                step.type === 'ORIUM_API' &&
                'stepId' in step &&
                'checkType' in step
              ) {
                return {
                  type: 'ORIUM_API',
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
  }

  const [createArchetypalPuzzle, { loading, error }] = useMutation<
    CreateBurdPuzzleMutation,
    MutationcreateBurdPuzzleArgs
  >(CREATE_BURD_PUZZLE_MUTATION, {
    onCompleted: () => {
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
        <div className="ik-form-field-error">
          I&apos;m sorry, but {slug} is not a valid slug; use lowercase letters
          and/or numbers seperated by dashes
        </div>
      )
    }
  }

  return (
    <div className="form my-11 max-w-2xl">
      <div className="rounded-t-xl bg-stone-500 p-2 text-center text-3xl tracking-wide">
        Create a new puzzle
      </div>
      <div className="rounded-b-xl bg-stone-300 p-8">
        <Form formMethods={formMethods} onSubmit={onSubmit}>
          <FormError error={error} />
          {process.env.NODE_ENV === 'development' && (
            <div>
              <div className="mb-8 inline-block rounded-xl bg-rose-700 p-2 text-lg text-red-200">
                Times this component has rendered: <b>{renderCount.current}</b>
              </div>
              <DevTool control={formMethods.control} />
            </div>
          )}
          <div id="puzzle-name" className="form__entry mb-12">
            <Label
              name="rewardable.name"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Name</div>
            </Label>
            <TextField
              name="rewardable.name"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              placeholder="Name"
              validation={{ required: true }}
            />
            {errors.rewardable?.name?.type === 'required' &&
              requiredFieldError('a Name')}
          </div>
          <div id="puzzle-slug" className="form__entry mb-12">
            <Label
              name="rewardable.slug"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Slug</div>
            </Label>
            <TextField
              name="rewardable.slug"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              placeholder="a Slug"
              validation={{ required: true }}
            />
            {errors.rewardable?.slug?.type === 'required' &&
              requiredFieldError('a Slug')}
            {requiredSlugFormatError(formMethods.getValues('rewardable.slug'))}
          </div>
          <div id="explanation" className="form__entry mb-12">
            <Label
              name="rewardable.explanation"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Explanation</div>
            </Label>
            <TextField
              name="rewardable.explanation"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              placeholder="Explanation"
              validation={{ required: true }}
            />
            {errors.rewardable?.explanation?.type === 'required' &&
              requiredFieldError('an Explanation')}
          </div>
          <div id="puzzle-success-message" className="form__entry mb-12">
            <Label
              name="rewardable.successMessage"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Success Message</div>
            </Label>
            <TextField
              name="rewardable.successMessage"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              placeholder="Success Message"
              validation={{ required: true }}
            />
            {errors.rewardable?.successMessage?.type === 'required' &&
              requiredFieldError('a Success Message')}
          </div>
          <div id="puzzle-org-id" className="form__entry mb-12">
            <Label
              name="rewardable.orgId"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Org Id</div>
            </Label>
            <TextField
              name="rewardable.orgId"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              // TODO: Currently this is hardwired to IK's Org ID, but it needs
              // to eventually say something like this for version 1.0:
              // if (currentUser.organizations?.id.includes('cla9yay7y003k08la2z4j2xrv')) {
              //   defaultValue={'cla9yay7y003k08la2z4j2xrv'}
              // } else { defaultValue={''} }
              defaultValue={'cla9yay7y003k08la2z4j2xrv'}
              // validation={{ required: true }}
            />
            {/* {errors.rewardable?.orgId?.type === 'required' &&
              requiredFieldError('an Organizational ID')} */}
          </div>
          <div id="puzzle-list-publicaly" className="form__entry mb-12">
            <Label
              name="rewardable.listPublicly"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              List Publicly
            </Label>

            <CheckboxField
              name="rewardable.listPublicly"
              className="form__text-field box-border block bg-stone-200 text-slate-700"
            />
          </div>

          <div id="puzzle-requirements" className="form__entry mb-12">
            <Label
              name="puzzle.requirements"
              className="form__label text-2xl font-bold text-slate-700"
            >
              <div className="form__entry-name mb-1">Requirements</div>
            </Label>
            <div className="my-8 text-stone-800">
              <SelectField name="puzzle.requirements" multiple>
                <option value="HOLDERS_ONLY">Holders Only</option>
                <option value="SOCIAL_ACCOUNT">Social Account</option>
                <option value="WALLET_GAS">Wallet Gas</option>
                <option value="TRAVEL">Travel</option>
                <option value="WORDPLAY">Wordplay</option>
                <option value="DETAIL">Detail</option>
                <option value="INTERACTIVE_OBJECT">Interactive Object</option>
              </SelectField>
            </div>
          </div>

          <div id="puzzle-cover-image" className="form__entry mb-12">
            <Label
              name="puzzle.coverImage"
              className="form__label text-2xl font-bold text-slate-700"
              errorClassName="form__label--error text-2xl font-bold text-rose-900"
            >
              <div className="form__entry-name mb-1">Cover Image</div>
            </Label>
            <TextField
              name="puzzle.coverImage"
              className="form__text-field box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
              placeholder="Cover Image"
              validation={{ required: true }}
            />
            {errors.rewardable?.successMessage?.type === 'required' &&
              requiredFieldError('a Success Message')}
          </div>

          {fields.map((field, index) => (
            <StepForm
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
                  type: 'SIMPLE_TEXT',
                  failMessage: '',
                  successMessage: '',
                  challenge: '',
                  resourceLinks: '',
                  stepSortWeight: 0,
                  solution: '',
                  solutionCharCount: 0,
                  solutionHint: '',
                  defaultImage: '',
                  solutionImage: '',
                  stepGuideType: 'SEEK',
                })
              }
            >
              Add Step
            </button>
          </div>
          {hasNoSteps && (
            <div className="rw-field-error">
              You must have at least one step in a puzzle!
            </div>
          )}
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Submit
          </Submit>
        </Form>
      </div>
    </div>
  )
}
