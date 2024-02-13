// BROWSER LOCATION: http://localhost:8910/puzzle/archetype

import { useRef, useEffect, useCallback, useState, useMemo } from 'react'

import { ApolloError, useLazyQuery } from '@apollo/client'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import CheckIcon from '@heroicons/react/24/solid/CheckIcon'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'
import { uniqBy } from 'lodash'
import debounce from 'lodash/debounce'
import useFormPersist from 'react-hook-form-persist'
import slugify from 'slugify'
import {
  CreateRewardableInput,
  CreateStepInput,
  CreateStepSimpleTextInput,
  CreateStepNftCheckInput,
  CreateStepFunctionCallInput,
  CreateStepComethApiInput,
  CreateStepTokenIdRangeInput,
  CreateStepOriumApiInput,
  CreatePuzzleInput,
  CreateBurdPuzzleMutation,
  EditBurdPuzzleMutation,
  EditBurdPuzzleMutationVariables,
  CreateBurdPuzzleMutationVariables,
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
  TextAreaField,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
  CheckboxField,
  NumberField,
  Control,
  FileField,
  Controller,
  UseFormClearErrors,
  UseFormSetError,
} from '@redwoodjs/forms'
import { LoaderIcon } from '@redwoodjs/web/dist/toast'

const CHECK_SLUG_EXISTENCE = gql`
  query CheckSlugExistence($slug: String!) {
    checkSlugExistence(slug: $slug)
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
      ranges: { startId: number; endId: number }[]
    } & Omit<CreateStepTokenIdRangeInput, 'stepId'>)
  | (CreateStepInputFrontEnd & Omit<CreateStepOriumApiInput, 'stepId'>)

// Set as a constant in case we need to change this string value later on
const stepsArrayName = 'steps'

const buildEmptyStep = (stepSortWeight = 1): CreateAllStepTypesInput => ({
  type: 'SIMPLE_TEXT',
  stepSortWeight,
  solution: '',
  solutionCharCount: 0,
  solutionHint: '',
  defaultImage: '',
  solutionImage: '',
  stepGuideType: 'SEEK',
  stepPage: [
    {
      body: '',
      image: '',
      showStepGuideHint: false,
      sortWeight: 1,
    },
  ],
})

// New puzzles start with no steps in an empty array
const startingSteps: CreateAllStepTypesInput[] = [buildEmptyStep()]

// Using the default: <FieldError /> field validator from react-hook-form creates
// cryptic (for the user) error messages like this: "steps.1.failMessage is required"
// because the default field validator is not configured for nested arrays of objects
// thus we have a custom error message function instead so as to not confuse users.
// NOTE: this is in parent scope & is used in both the 'Puzzle' and 'Step' forms
function requiredFieldError(fieldName: string) {
  return (
    <div className="form__error pt-1 font-medium text-rose-300">
      I&apos;m sorry, but {fieldName} is required!
    </div>
  )
}

function imageLinkPatternError(fieldName: string) {
  return (
    <p className="form__error pt-1 font-medium text-rose-800">
      Please ensure your {fieldName} link begins with &quot;http(s)://&quot;
    </p>
  )
}

const convertToBase64 = (file?: File): Promise<string> => {
  if (!file) {
    throw new Error('File missing')
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('File reading did not result in a string.'))
      }
    }

    reader.onerror = (error) => reject(error)
  })
}

const imageLinkPattern = /^(http|https):\/\/.*/

// These are used to style labels (<Label />) for nested components
const defaultStyles = 'form__label text-slate-100'
const defaultTitleColor = 'text-slate-700'
const errorTitleColor = 'text-rose-900'

const LOCAL_STORAGE_KEY = 'puzzleForm'

// This is the component that renders each step in the puzzle form
function StepForm({
  index,
  register,
  watch,
  setValue,
  getValues,
  remove,
  errors,
  control,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  watch: UseFormWatch<PuzzleFormType>
  setValue: UseFormSetValue<PuzzleFormType>
  getValues: UseFormGetValues<PuzzleFormType>
  remove: (index: number) => void
  errors: FieldErrors<PuzzleFormType>
  control: Control<PuzzleFormType, unknown>
}) {
  // Watch for `stepTypeVal` changes so that we can set the default values
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  // This is a custom hook that sets the default values for each step
  useEffect(() => {
    const commonStepFields = {
      stepSortWeight: getValues(`${stepsArrayName}.${index}.stepSortWeight`),
      solutionHint: getValues(`${stepsArrayName}.${index}.solutionHint`),
      defaultImage: getValues(`${stepsArrayName}.${index}.defaultImage`),
      solutionImage: getValues(`${stepsArrayName}.${index}.solutionImage`),
      stepGuideType: getValues(`${stepsArrayName}.${index}.stepGuideType`),
      stepPage: getValues(`${stepsArrayName}.${index}.stepPage`),
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
        // ranges: [{ startId: 0, endId: 0 }],
        ranges: [],
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

  // Token ID ranges field array
  const {
    fields: tokenIdFields,
    append,
    // remove: tokenIdRemove,
  } = useFieldArray({
    control,
    name: `${stepsArrayName}.${index}.ranges`,
  })

  const {
    fields: stepPageFields,
    append: appendStepPageField,
    remove: removeStepPageField,
  } = useFieldArray({
    control,
    name: `${stepsArrayName}.${index}.stepPage`,
    shouldUnregister: true,
    rules: {
      required: true,
      validate: {
        duplicateSortWeight: (value) => {
          return uniqBy(value, 'sortWeight').length === value.length
        },
      },
    },
  })

  // // this function is used to remove a token id range fieldset
  // // this works but may not be ideal
  // const removeFieldset = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const fieldset = event.currentTarget.closest('fieldset')
  //   if (fieldset) {
  //     fieldset.remove()
  //   }
  // }

  // // this is a refactor of the above function
  const removeFieldset = (tokenIdIndex: number) => {
    const fieldset = document.getElementById(`token-id-index-${tokenIdIndex}`)
    if (fieldset) {
      fieldset.remove()
    }
  }

  return (
    <fieldset className="ik-child-form mb-8 rounded-lg border-2 border-gray-300 bg-transparent p-4">
      <div className="form__label text-center text-4xl font-extrabold tracking-widest text-slate-300">
        Step {index + 1}
      </div>

      <div id={`${index}-solution-hint`} className="form__entry mb-12">
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
          className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
        />
      </div>

      <div id={`${index}-default-image`} className="form__entry mb-12">
        <Label
          name={`defaultImage.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.defaultImage?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
          // left off here on 2/12/2024
          // this code below is not working for some reason
          errorClassName="form__label--error text-rose-300"
        >
          <div className="form__entry-name mb-1">
            Default Image<span className="text-rose-500">*</span>
          </div>
        </Label>
        <TextField
          placeholder="Default Image"
          {...register(`${stepsArrayName}.${index}.defaultImage`)}
          className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
          validation={{ required: true, pattern: imageLinkPattern }}
        />
        {errors[stepsArrayName]?.[index]?.defaultImage?.type === 'required' &&
          requiredFieldError('Default Image')}
        {errors[stepsArrayName]?.[index]?.defaultImage?.type === 'pattern' &&
          imageLinkPatternError('default image')}
      </div>

      <div id={`${index}-solution-image`} className="form__entry mb-12">
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
          className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
          validation={{ pattern: imageLinkPattern }}
        />
        {errors[stepsArrayName]?.[index]?.solutionImage?.type === 'pattern' &&
          imageLinkPatternError('solution image')}
      </div>

      <div id={`${index}-step-sort-weight`} className="form__entry mb-12">
        <Label
          name={`stepSortWeight.${index}`}
          className={`${defaultStyles} ${
            errors[stepsArrayName]?.[index]?.stepSortWeight?.type === 'required'
              ? errorTitleColor
              : defaultTitleColor
          }`}
        >
          <div className="form__entry-name mb-1">
            Step Sort Weight<span className="text-rose-500">*</span>
          </div>
        </Label>
        <NumberField
          {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
          className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
          validation={{ required: true }}
          min="1"
        />
        {errors[stepsArrayName]?.[index]?.stepSortWeight?.type === 'required' &&
          requiredFieldError('Step Sort Weight')}
        {errors?.[stepsArrayName]?.root?.type === 'duplicateSortWeight' && (
          <p className="rw-field-error">Steps must have unique sort weight</p>
        )}
      </div>

      <div id={`${index}-step-type-guide`} className="form__entry mb-12 hidden">
        <Label
          name={`stepTypeGuide.${index}`}
          className="form__label text-slate-100"
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
            <option value="TRACK">Track</option>
            <option value="COLLECT">Collect</option>
            <option value="ACTIVATE">Activate</option>
          </SelectField>
        </div>
      </div>

      <div className="my-8 hidden text-stone-800">
        <SelectField
          {...register(`${stepsArrayName}.${index}.type`)}
          defaultValue="SIMPLE_TEXT"
        >
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
                errors[stepsArrayName][index] &&
                'solution' in errors[stepsArrayName][index] &&
                'type' in errors[stepsArrayName][index].solution &&
                errors[stepsArrayName][index].solution.type === 'required'
                  ? `${defaultStyles} ${errorTitleColor}`
                  : `${defaultStyles} ${defaultTitleColor}`
              }
            >
              <div className="form__entry-name mb-1">
                Pass Code<span className="text-rose-500">*</span>
              </div>
            </Label>
            <TextField
              placeholder="Pass Code"
              {...register(`${stepsArrayName}.${index}.solution`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              validation={{ required: true }}
            />
            {Array.isArray(errors[stepsArrayName]) &&
              errors[stepsArrayName][index] &&
              'solution' in errors[stepsArrayName][index] &&
              'type' in errors[stepsArrayName][index].solution &&
              errors[stepsArrayName][index].solution.type === 'required' &&
              requiredFieldError('a pass code')}
          </div>
        </div>
      )}
      {stepTypeVal === 'NFT_CHECK' && (
        <div className="step__type">
          <div className="form__entry mb-12">
            <Label name="requireAllNfts" className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Require All NFTs</div>
            </Label>
            <CheckboxField
              {...register(`${stepsArrayName}.${index}.requireAllNfts`)}
              className="form__text-field mt-1 mb-10 box-border block bg-stone-200 text-slate-700"
            />
          </div>

          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(
                `${stepsArrayName}.${index}.nftCheckData.0.contractAddress`
              )}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
            />
          </div>
          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Chain Id</div>
            </Label>
            <TextField
              placeholder="Chain Id"
              {...register(`${stepsArrayName}.${index}.nftCheckData.0.chainId`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
            />
          </div>
          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Token Id</div>
            </Label>
            <TextField
              placeholder="Token Id"
              {...register(`${stepsArrayName}.${index}.nftCheckData.0.tokenId`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
            />
          </div>
          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">POAP Event Id</div>
            </Label>
            <TextField
              placeholder="POAP Event Id"
              {...register(
                `${stepsArrayName}.${index}.nftCheckData.0.poapEventId`
              )}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
            />
          </div>
        </div>
      )}
      {stepTypeVal === 'FUNCTION_CALL' && (
        <div className="step__type">
          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Method Ids</div>
            </Label>
            <TextField
              placeholder="Method Ids"
              {...register(`${stepsArrayName}.${index}.methodIds`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
            />
          </div>
          <div className="form__entry mb-12">
            <Label name={stepTypeVal} className="form__label text-slate-100">
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(`${stepsArrayName}.${index}.contractAddress`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
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
              name={`${stepsArrayName}.${index}.contractAddress`}
              className={
                Array.isArray(errors[stepsArrayName]) &&
                'contractAddress' in errors[stepsArrayName][index] &&
                'type' in errors[stepsArrayName][index].contractAddress &&
                errors[stepsArrayName][index].contractAddress.type ===
                  'required'
                  ? `${defaultStyles} ${errorTitleColor}`
                  : `${defaultStyles} ${defaultTitleColor}`
              }
            >
              <div className="form__entry-name mb-1">Contract Address</div>
            </Label>
            <TextField
              placeholder="Contract Address"
              {...register(`${stepsArrayName}.${index}.contractAddress`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              validation={{ required: true }}
            />
            {Array.isArray(errors[stepsArrayName]) &&
              'contractAddress' in errors[stepsArrayName][index] &&
              'type' in errors[stepsArrayName][index].contractAddress &&
              errors[stepsArrayName][index].contractAddress.type ===
                'required' &&
              requiredFieldError('a contract address')}
          </div>
          <div className="form__entry mb-12">
            <Label
              name={`${stepsArrayName}.${index}.chainId`}
              className={
                Array.isArray(errors[stepsArrayName]) &&
                'chainId' in errors[stepsArrayName][index] &&
                'type' in errors[stepsArrayName][index].chainId &&
                errors[stepsArrayName][index].chainId.type === 'required'
                  ? `${defaultStyles} ${errorTitleColor}`
                  : `${defaultStyles} ${defaultTitleColor}`
              }
            >
              <div className="form__entry-name mb-1">Chain Id</div>
            </Label>
            <TextField
              placeholder="Chain Id"
              {...register(`${stepsArrayName}.${index}.chainId`)}
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              validation={{ required: true }}
            />
            {Array.isArray(errors[stepsArrayName]) &&
              'chainId' in errors[stepsArrayName][index] &&
              'type' in errors[stepsArrayName][index].chainId &&
              errors[stepsArrayName][index].chainId.type === 'required' &&
              requiredFieldError('a chain id')}
          </div>

          <div id="dynamically-add-token-id-ranges" className="m-4 p-6">
            {tokenIdFields.map((field, tokenIdIndex) => (
              <div key={field.id}>
                <fieldset id={`token-id-index-${tokenIdIndex}`}>
                  {/* these are temporary values for debugging purposes */}
                  <p className="text-red-500">Index: {tokenIdIndex}</p>
                  <p className="text-red-500">ID: {field.id}</p>
                  <div className="mb-8 rounded-lg border-2 border-gray-500 bg-gray-100 p-6">
                    <div className="form__label mb-12 text-center text-3xl font-extrabold tracking-widest text-slate-700">
                      Token ID Range {tokenIdIndex + 1}
                    </div>
                    <div id="start-id" className="form__entry mb-12">
                      <Label
                        name={`${stepsArrayName}.${index}.ranges.${tokenIdIndex}.startId`}
                        className={`${defaultStyles} ${
                          Array.isArray(errors[stepsArrayName]) &&
                          // Array.isArray(errors[stepsArrayName]) &&
                          errors[stepsArrayName][index]?.ranges &&
                          errors[stepsArrayName][index].ranges[tokenIdIndex]
                            ?.startId
                            ? errorTitleColor
                            : defaultTitleColor
                        }`}
                      >
                        <div className="form__entry-name mb-1">Start ID</div>
                      </Label>
                      <TextField
                        placeholder="Start ID"
                        {...register(
                          `${stepsArrayName}.${index}.ranges.${tokenIdIndex}.startId`
                        )}
                        className="form__text-field mb-4 box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
                        validation={{ required: true }}
                      />

                      {Array.isArray(errors[stepsArrayName]) &&
                        errors[stepsArrayName][index]?.ranges?.[tokenIdIndex]
                          ?.startId?.type === 'required' &&
                        requiredFieldError('a Start ID')}
                    </div>

                    <div id="end-id" className="form__entry mb-12">
                      <Label
                        name={`${stepsArrayName}.${index}.ranges.${tokenIdIndex}.endId`}
                        className={`${defaultStyles} ${
                          Array.isArray(errors[stepsArrayName]) &&
                          errors[stepsArrayName][index]?.ranges &&
                          errors[stepsArrayName][index].ranges[tokenIdIndex]
                            ?.endId
                            ? errorTitleColor
                            : defaultTitleColor
                        }`}
                      >
                        <div className="form__entry-name mb-1">End ID</div>
                      </Label>
                      <TextField
                        placeholder="End ID"
                        {...register(
                          `${stepsArrayName}.${index}.ranges.${tokenIdIndex}.endId`
                        )}
                        className="form__text-field mb-4 box-border block rounded-lg bg-stone-200 text-slate-700 placeholder-zinc-400"
                        validation={{ required: true }}
                      />

                      {Array.isArray(errors[stepsArrayName]) &&
                        errors[stepsArrayName][index]?.ranges?.[tokenIdIndex]
                          ?.endId?.type === 'required' &&
                        requiredFieldError('an End ID')}
                    </div>

                    <button
                      type="button"
                      className="rw-button rw-button-red"
                      onClick={() => removeFieldset(tokenIdIndex)}
                    >
                      <div className="">Remove Token ID Range</div>
                    </button>
                  </div>
                </fieldset>
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
            className="form__label text-slate-100"
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
          className={clsx('rw-button rw-button-red', {
            'pointer-events-none opacity-40': getValues('steps').length == 1,
          })}
          onClick={() => remove(index)}
          disabled={getValues('steps').length === 1}
        >
          Delete this Step
        </button>
      </div>

      <div className="mt-12 rounded-xl border-2 border-stone-400 bg-transparent p-4">
        {stepPageFields.map((field, stepPageIndex) => (
          <div key={field.id} className="mb-12">
            <div className="form__label text-center text-4xl font-extrabold tracking-widest text-slate-300">
              Step Page {stepPageIndex + 1}
            </div>
            <fieldset
              id={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}`}
            >
              <div
                id={`step-page-${stepPageIndex}-body`}
                className="form__entry mb-12"
              >
                <Label
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.body`}
                  className={`${defaultStyles} ${
                    Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][stepPageIndex]?.stepPage &&
                    errors[stepsArrayName][stepPageIndex].stepPage[
                      stepPageIndex
                    ]?.body
                      ? errorTitleColor
                      : defaultTitleColor
                  }`}
                >
                  <div className="form__entry-name mb-1">
                    Body<span className="text-rose-500">*</span>
                  </div>
                </Label>
                <TextField
                  placeholder="Body"
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.body`}
                  className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
                  validation={{ required: true }}
                />
                {errors?.[stepsArrayName]?.[stepPageIndex]?.stepPage?.[
                  stepPageIndex
                ]?.body?.type === 'required' && requiredFieldError('a body')}
              </div>

              <div
                id={`step-page-${stepPageIndex}-image`}
                className="form__entry mb-12"
              >
                <Label
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.image`}
                  className={`${defaultStyles} ${
                    Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][stepPageIndex]?.stepPage &&
                    errors[stepsArrayName][stepPageIndex].stepPage[
                      stepPageIndex
                    ]?.image
                      ? errorTitleColor
                      : defaultTitleColor
                  }`}
                >
                  <div className="form__entry-name mb-1">Image</div>
                </Label>
                <TextField
                  placeholder="Image"
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.image`}
                  className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
                  validation={{ pattern: imageLinkPattern }}
                />
                {errors[stepsArrayName]?.[index]?.stepPage?.[stepPageIndex]
                  ?.image?.type === 'pattern' &&
                  imageLinkPatternError('step image')}
              </div>

              <div
                id={`step-page-${stepPageIndex}-hint`}
                className="form__entry mb-12"
              >
                <Label
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.showStepGuideHint`}
                  className={`${defaultStyles} ${
                    Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][stepPageIndex]?.stepPage &&
                    errors[stepsArrayName][stepPageIndex].stepPage[
                      stepPageIndex
                    ]?.showStepGuideHint
                      ? errorTitleColor
                      : defaultTitleColor
                  }`}
                >
                  <div className="form__entry-name mb-1">Show hint</div>
                </Label>
                <CheckboxField
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.showStepGuideHint`}
                  className="form__text-field box-border block bg-stone-200 text-slate-700"
                />
              </div>
              <div
                id={`step-page-${stepPageIndex}-sortWeight`}
                className="form__entry mb-12"
              >
                <Label
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.sortWeight`}
                  className={`${defaultStyles} ${
                    Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][stepPageIndex]?.stepPage &&
                    errors[stepsArrayName][stepPageIndex].stepPage[
                      stepPageIndex
                    ]?.sortWeight
                      ? errorTitleColor
                      : defaultTitleColor
                  }`}
                >
                  <div className="form__entry-name mb-1">
                    Sort Weight<span className="text-rose-500">*</span>
                  </div>
                </Label>

                <NumberField
                  placeholder="sortWeight"
                  name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.sortWeight`}
                  className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
                  validation={{ required: true }}
                  min="1"
                />
                {errors?.[stepsArrayName]?.[index]?.stepPage?.root?.type ===
                  'duplicateSortWeight' && (
                  <p className="rw-field-error text-base text-rose-300">
                    Step page must have unique sort weight
                  </p>
                )}
              </div>
            </fieldset>
            <button
              onClick={() => removeStepPageField(stepPageIndex)}
              type="button"
              className={clsx('rw-button rw-button-red', {
                'pointer-events-none opacity-40': stepPageFields.length === 1,
              })}
              disabled={stepPageFields.length === 1}
            >
              Delete This Step Page
            </button>
          </div>
        ))}
        <div className="rw-button-group">
          <button
            type="button"
            className="rw-button rw-button-blue"
            onClick={() =>
              appendStepPageField({
                body: '',
                image: '',
                showStepGuideHint: false,
                sortWeight: stepPageFields.length + 1,
              })
            }
          >
            Add Step Page
          </button>
        </div>
      </div>
      {errors?.[stepsArrayName]?.[index]?.stepPage?.root?.type ===
        'required' && (
        <div className="rw-field-error">
          You must have at least one step page in a step!
        </div>
      )}
    </fieldset>
  )
}

// This type definition is used in the PuzzleForm component below
// It does not get used in the Step component above
type PuzzleFormWithoutNftImage = {
  rewardable: {
    name: CreateRewardableInput['name']
    slug: CreateRewardableInput['slug']
    successMessage: CreateRewardableInput['successMessage']
    listPublicly?: CreateRewardableInput['listPublicly']
    nft: {
      name: string
    }
  }
  puzzle: {
    coverImage: CreatePuzzleInput['coverImage']
    requirements: CreatePuzzleInput['requirements']
  }
  steps: CreateAllStepTypesInput[]
}

type PuzzleFormType = PuzzleFormWithoutNftImage & {
  rewardable: {
    nft: {
      image: FileList
    }
  }
}

type InitialValuesType = PuzzleFormWithoutNftImage & {
  rewardable: {
    nft: {
      image: string
    }
  }
}

export default function PuzzleForm({
  initialValues,
  isEditMode = false,
  onFormSubmit,
  submissionError,
  submissionPending,
}: {
  initialValues?: InitialValuesType
  isEditMode?: boolean
  onFormSubmit: (
    variables:
      | CreateBurdPuzzleMutationVariables
      | Omit<EditBurdPuzzleMutationVariables, 'rewardableId' | 'puzzleId'>
  ) => Promise<{
    data?: CreateBurdPuzzleMutation | EditBurdPuzzleMutation | null
  }>
  submissionError?: ApolloError
  submissionPending?: boolean
}) {
  const [isSlugCheckLoading, setIsSlugCheckLoading] = useState(false)
  const [checkSlugExistence] = useLazyQuery(CHECK_SLUG_EXISTENCE, {
    fetchPolicy: 'network-only', // Skips cache to ensure up-to-date result
  })

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
      [stepsArrayName]: isEditMode ? initialValues?.steps : startingSteps,
      rewardable: {
        name: initialValues?.rewardable?.name,
        slug: initialValues?.rewardable?.slug,
        successMessage: initialValues?.rewardable?.successMessage,
        nft: {
          name: initialValues?.rewardable?.nft?.name,
        },
      },
      puzzle: {
        coverImage: initialValues?.puzzle?.coverImage,
        requirements: initialValues?.puzzle?.requirements,
      },
    },
  })

  const { errors } = formMethods.formState

  // Steps Field Array for Token ID Ranges (and steps too?)
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: stepsArrayName,
    rules: {
      required: true,
      validate: {
        duplicateSortWeight: (value) => {
          return uniqBy(value, 'stepSortWeight').length === value.length
        },
      },
    },
  })

  useFormPersist(LOCAL_STORAGE_KEY, {
    watch: formMethods.watch,
    setValue: formMethods.setValue,
    storage: window.localStorage,
    exclude: isEditMode ? ['rewardable', 'puzzle', 'steps'] : [],
  })

  const debouncedCheckSlugExistence = useMemo(
    () =>
      debounce(async (slug, setError, clearErrors) => {
        const { data } = await checkSlugExistence({ variables: { slug } })
        setIsSlugCheckLoading(false)

        if (data?.checkSlugExistence) {
          setError('rewardable.slug', {
            type: 'unique',
            message: 'Slug already exists.',
          })
        } else {
          clearErrors('rewardable.slug')
        }
      }, 750),
    [checkSlugExistence]
  )

  const handleSlugInputChange = useCallback(
    (
      slug: string,
      setError: UseFormSetError<PuzzleFormType>,
      clearErrors: UseFormClearErrors<PuzzleFormType>
    ) => {
      if (!slug) {
        clearErrors('rewardable.slug')
        setIsSlugCheckLoading(false)
        return
      }

      // In edit mode, don't run query unless the slug has been changed
      if (isEditMode && slug === initialValues?.rewardable.slug) {
        setIsSlugCheckLoading(false)
        return clearErrors('rewardable.slug')
      }

      setIsSlugCheckLoading(true)
      clearErrors('rewardable.slug')
      debouncedCheckSlugExistence(slug, setError, clearErrors)
    },
    [debouncedCheckSlugExistence, isEditMode, initialValues?.rewardable.slug]
  )

  useEffect(() => {
    return () => {
      debouncedCheckSlugExistence.cancel()
    }
  }, [debouncedCheckSlugExistence])

  const onSubmit = async (input: PuzzleFormType) => {
    const nftImageList = input.rewardable.nft.image

    if (!nftImageList?.length && !isEditMode) {
      throw new Error('missing nft image')
    }

    const nftImageBase64 = nftImageList?.length
      ? await convertToBase64(input.rewardable.nft.image?.[0])
      : null

    const submission = await onFormSubmit({
      input: {
        name: input.rewardable.name,
        type: 'PUZZLE', // hard coded for now
        slug: slugify(input.rewardable.slug, { strict: true }),
        successMessage: input.rewardable.successMessage,
        listPublicly: false, // hard coded for now,
        nft: {
          name: input.rewardable.nft.name,
          image: nftImageBase64,
        },
        puzzle: {
          rewardableId: 'ignore me',
          requirements: input.puzzle.requirements,
          coverImage: input.puzzle.coverImage,
          steps: input.steps.map((step) => {
            const commonStepFields = {
              puzzleId: 'ignore me',
              stepSortWeight: step.stepSortWeight,
              solutionHint: step.solutionHint,
              defaultImage: step.defaultImage,
              solutionImage: step.solutionImage,
              stepGuideType: step.stepGuideType,
              stepPage: step.stepPage,
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

                  startIds: step.ranges.map((range) => Number(range.startId)),
                  endIds: step.ranges.map((range) => Number(range.endId)),
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
    })

    if (
      !isEditMode &&
      submission.data &&
      'createBurdPuzzle' in submission.data &&
      submission.data.createBurdPuzzle.success
    ) {
      formMethods.reset()
    }
  }

  return (
    <div className="form">
      <div className="p-2 text-center text-3xl tracking-wide">
        {isEditMode ? 'Edit your puzzle' : 'Create a new puzzle'}
      </div>
      <div className="p-9">
        <Form formMethods={formMethods} onSubmit={onSubmit}>
          <FormError error={submissionError} />
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
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-2.5">
                Name<span className="text-rose-500">*</span>
              </div>
            </Label>
            <TextField
              name="rewardable.name"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="Pick a name for your puzzle!"
              validation={{ required: true }}
            />
            {errors.rewardable?.name?.type === 'required' &&
              requiredFieldError('a Name')}
          </div>
          <div id="puzzle-slug" className="form__entry mb-12">
            <Label
              name="rewardable.slug"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">
                Slug<span className="text-rose-500">*</span>
              </div>
            </Label>

            <div className="flex items-center">
              <TextField
                {...formMethods.register('rewardable.slug', {
                  onChange: (e) => {
                    formMethods.setValue('rewardable.slug', e.target.value)
                    handleSlugInputChange(
                      slugify(e.target.value, { strict: true }),
                      formMethods.setError,
                      formMethods.clearErrors
                    )
                  },
                })}
                className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
                placeholder="Write a slug where your puzzle will live."
              />

              {!isSlugCheckLoading &&
                errors.rewardable?.slug?.type !== 'unique' &&
                formMethods.getValues('rewardable.slug') && (
                  <CheckIcon className="ml-1 h-5 w-5 text-green-600" />
                )}

              {!isSlugCheckLoading &&
                errors.rewardable?.slug?.type === 'unique' && (
                  <XMarkIcon className="ml-1 h-5 w-5 text-rose-800" />
                )}

              {isSlugCheckLoading && (
                <div className="ml-2">
                  <LoaderIcon />
                </div>
              )}
            </div>

            <p className="text-slate-500">
              {slugify(formMethods.getValues('rewardable.slug') || '', {
                strict: true,
              })}
            </p>

            {!isSlugCheckLoading &&
              errors.rewardable?.slug?.type === 'unique' && (
                <p className="form__error pt-1 font-medium text-rose-800">
                  {errors.rewardable?.slug?.message}
                </p>
              )}

            {errors.rewardable?.slug?.type === 'required' &&
              requiredFieldError('a Slug')}
          </div>

          {/* @NOTE: This is currently only used for packs */}
          {/* <div id="explanation" className="form__entry mb-12">
            <Label
              name="rewardable.explanation"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">Explanation</div>
            </Label>
            <TextField
              name="rewardable.explanation"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="Explanation"
              validation={{ required: true }}
            />
            {errors.rewardable?.explanation?.type === 'required' &&
              requiredFieldError('an Explanation')}
          </div> */}

          <div id="puzzle-success-message" className="form__entry mb-12">
            <Label
              name="rewardable.successMessage"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">Success Message</div>
            </Label>
            <TextAreaField
              name="rewardable.successMessage"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="Compose a success message the user will see when solving your puzzle."
            />
          </div>

          {/* @NOTE: Hard coded to `false` while testing */}
          <div id="puzzle-list-publicly" className="form__entry mb-12 hidden">
            <Label
              name="rewardable.listPublicly"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
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
              className="form__label text-slate-100"
            >
              <div className="form__entry-name mb-1">
                Requirements<span className="text-rose-500">*</span>
              </div>
              <p className="text-sm font-normal">
                Hold ctrl/cmd to select multiple
              </p>
            </Label>
            <div className="my-8 text-stone-800">
              <SelectField
                name="puzzle.requirements"
                multiple
                className="border-1 rounded-md border-slate-300 bg-transparent text-slate-400"
                validation={{ required: true }}
              >
                {/*
                  <option value="HOLDERS_ONLY">Holders Only</option>
                  <option value="SOCIAL_ACCOUNT">Social Account</option>
                  <option value="WALLET_GAS">Wallet Gas</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="INTERACTIVE_OBJECT">Interactive Object</option>
                */}
                <option value="WORDPLAY">Wordplay</option>
                <option value="DETAIL">Detail</option>
              </SelectField>
              {errors.puzzle?.requirements?.type === 'required' &&
                requiredFieldError('a requirement')}
            </div>
          </div>

          <div id="puzzle-cover-image" className="form__entry mb-12">
            <Label
              name="puzzle.coverImage"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">
                Cover Image<span className="text-rose-500">*</span>
              </div>
            </Label>
            <TextField
              name="puzzle.coverImage"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="Cover Image"
              validation={{
                required: true,
                pattern: imageLinkPattern,
              }}
            />
            {errors.puzzle?.coverImage?.type === 'required' &&
              requiredFieldError('a cover image')}
            {errors.puzzle?.coverImage?.type === 'pattern' &&
              imageLinkPatternError('cover image')}
          </div>

          <div id="nft-name" className="form__entry mb-12">
            <Label
              name="rewardable.nft.name"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">
                NFT Name<span className="text-rose-500">*</span>
              </div>
            </Label>
            <TextField
              name="rewardable.nft.name"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="NFT Name"
              validation={{ required: true }}
            />
            {errors.rewardable?.nft?.name?.type === 'required' &&
              requiredFieldError('an nft name')}
          </div>

          <div id="nft-image" className="form__entry mb-12">
            {isEditMode &&
              initialValues?.rewardable.nft.image &&
              !formMethods.getValues('rewardable.nft.image')?.[0] && (
                <div className="mb-2 w-24">
                  <img src={initialValues?.rewardable.nft.image} alt="" />
                </div>
              )}

            <Label
              name="rewardable.nft.image"
              className="form__label text-slate-100"
              errorClassName="form__label--error text-rose-300"
            >
              <div className="form__entry-name mb-1">
                NFT Image<span className="text-rose-500">*</span>
              </div>
              <p className="mb-2 text-sm font-normal">
                Image must be smaller than 5MB
              </p>
            </Label>
            <FileField
              name="rewardable.nft.image"
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-400 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="NFT Name"
              validation={{
                required: !isEditMode,
                validate: {
                  imageSize: (value: FileList) => {
                    if (!value.length) return true

                    const maxSizeInBytes = 5 * 1024 * 1024
                    return value?.[0].size < maxSizeInBytes
                  },
                },
              }}
              accept=".jpeg, .png, .jpg, .webp"
            />
            {errors.rewardable?.nft?.image?.type === 'required' &&
              requiredFieldError('an nft image')}
            {errors.rewardable?.nft?.image?.type === 'imageSize' && (
              <p className="form__error pt-1 font-medium text-rose-800">
                Please select an image smaller than 5MB
              </p>
            )}
          </div>

          {fields.map((field, index) => {
            return (
              <StepForm
                index={index}
                register={formMethods.register}
                key={field.id}
                watch={formMethods.watch}
                setValue={formMethods.setValue}
                getValues={formMethods.getValues}
                remove={remove}
                errors={errors}
                control={formMethods.control}
              />
            )
          })}
          <div className="rw-button-group">
            <button
              type="button"
              className="rw-button rw-button-blue"
              onClick={() => append(buildEmptyStep(fields.length + 1))}
            >
              Add Step
            </button>
          </div>
          {errors?.[stepsArrayName]?.root?.type === 'required' && (
            <div className="rw-field-error">
              You must have at least one step in a puzzle!
            </div>
          )}
          <Submit
            disabled={
              submissionPending || errors.rewardable?.slug?.type === 'unique'
            }
            className="rw-button rw-button-blue"
          >
            Submit
          </Submit>
        </Form>
      </div>
    </div>
  )
}
