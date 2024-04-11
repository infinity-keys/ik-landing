import { useRef, useEffect, useState } from 'react'

import { ApolloError } from '@apollo/client'
import { Tab, Disclosure } from '@headlessui/react'
import {
  ChevronRightIcon,
  TrashIcon,
  XCircleIcon,
  KeyIcon,
  LightBulbIcon,
} from '@heroicons/react/20/solid'
import {
  PlusCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import useFormPersist from 'react-hook-form-persist'
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
  EditRewardableMutationVariables,
  CreateRewardableMutationVariables,
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
  Control,
  Controller,
} from '@redwoodjs/forms'

import Button, { generateButtonClasses } from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

// import CloudinaryUpload from './CloudinaryUpload/CloudinaryUpload'
import CloudinaryUploadWidget, {
  formatImageSrc,
} from './CloudinaryUpload/CloudinaryUploadWidget'
import DisplayImage from './DisplayImage/DisplayImage'
import TabLabel from './TabLabel'

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
  stepGuideType: 'SEEK',
  stepPage: [
    {
      body: '',
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
        solution: getValues(`${stepsArrayName}.${index}.solution`) || '',
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
    <Disclosure defaultOpen>
      {({ open }) => (
        <fieldset className="ik-child-form border-b border-stone-50">
          <Disclosure.Button className="w-full text-left">
            <div className="flex items-center gap-2 py-4">
              <p className="form__label min-w-[56px] text-lg text-white">
                Step {index + 1}{' '}
              </p>
              <ChevronRightIcon
                className={clsx('h-6 w-6 transition', {
                  'rotate-90 transform': open,
                })}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="mt-6">
            <div className="mt-2 mb-16 rounded-xl">
              <p className="mb-2">
                Story Blocks<span className="text-rose-500">*</span>
              </p>
              {stepPageFields.map((field, stepPageIndex) => (
                <div key={field.id} className="relative">
                  <fieldset
                    id={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}`}
                  >
                    {stepPageFields.length > 1 && (
                      <button
                        onClick={() => removeStepPageField(stepPageIndex)}
                        type="button"
                        className="absolute right-0 top-0 translate-x-3 -translate-y-3"
                      >
                        <XCircleIcon className="h-6 w-6" />
                      </button>
                    )}

                    <div
                      id={`step-page-${stepPageIndex}-body`}
                      className="form__entry mb-6"
                    >
                      {/* <Label
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
                        <div className="form__entry-name mb-1 text-slate-100">
                          Body<span className="text-rose-500">*</span>
                        </div>
                      </Label> */}
                      <TextAreaField
                        placeholder="Write the text of your puzzle here"
                        name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.body`}
                        className="form__text-field border-1 box-border block w-full resize-none rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                        validation={{ required: true }}
                      />
                      {errors?.[stepsArrayName]?.[stepPageIndex]?.stepPage?.[
                        stepPageIndex
                      ]?.body?.type === 'required' &&
                        requiredFieldError('a body')}
                    </div>

                    {/* <div
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
                        <div className="form__entry-name mb-1 text-slate-100">
                          Image
                        </div>
                      </Label>
                      <TextField
                        placeholder="Image"
                        name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.image`}
                        className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                        validation={{ pattern: imageLinkPattern }}
                      />
                      {errors[stepsArrayName]?.[index]?.stepPage?.[
                        stepPageIndex
                      ]?.image?.type === 'pattern' &&
                        imageLinkPatternError('step image')}
                    </div> */}

                    {/* <div
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
                        <div className="form__entry-name mb-1 text-slate-100">
                          Show hint
                        </div>
                      </Label>
                      <CheckboxField
                        name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.showStepGuideHint`}
                        className="form__text-field box-border block bg-stone-200 text-slate-700"
                      />
                    </div> */}

                    {/* <div
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
                        <div className="form__entry-name mb-1 text-slate-100">
                          Sort Weight<span className="text-rose-500">*</span>
                        </div>
                      </Label>

                      <NumberField
                        placeholder="sortWeight"
                        name={`${stepsArrayName}.${index}.stepPage.${stepPageIndex}.sortWeight`}
                        className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                        validation={{ required: true }}
                        min="1"
                        value={stepPageIndex + 1}
                      />
                      {errors?.[stepsArrayName]?.[index]?.stepPage?.root
                        ?.type === 'duplicateSortWeight' && (
                        <p className="rw-field-error text-base text-rose-300">
                          Step page must have unique sort weight
                        </p>
                      )}
                    </div> */}
                  </fieldset>
                </div>
              ))}

              {stepPageFields.length < 3 && (
                <div className="mt-t mb-10 border-y border-stone-50 py-2">
                  <button
                    type="button"
                    className="block w-full py-2"
                    onClick={() =>
                      appendStepPageField({
                        body: '',
                        showStepGuideHint: false,
                        sortWeight: stepPageFields.length + 1,
                      })
                    }
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <PlusCircleIcon className="h-6 w-6 fill-transparent" />{' '}
                      Story Block
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/*
            <div id={`${index}-solution-image`} className="form__entry mb-12">
              <Label
                name={`solutionImage.${index}`}
                className={`${defaultStyles} ${
                  errors[stepsArrayName]?.[index]?.solutionImage?.type ===
                  'required'
                    ? errorTitleColor
                    : defaultTitleColor
                }`}
              >
                <div className="form__entry-name mb-1 text-slate-100">
                  Solution Image
                </div>
              </Label>
              <TextField
                placeholder="Solution Image"
                {...register(`${stepsArrayName}.${index}.solutionImage`)}
                className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                validation={{ pattern: imageLinkPattern }}
              />
              {errors[stepsArrayName]?.[index]?.solutionImage?.type ===
                'pattern' && imageLinkPatternError('solution image')}
            </div> */}

            {/* <div id={`${index}-step-sort-weight`} className="form__entry mb-12">
              <Label
                name={`stepSortWeight.${index}`}
                className={`${defaultStyles} ${
                  errors[stepsArrayName]?.[index]?.stepSortWeight?.type ===
                  'required'
                    ? errorTitleColor
                    : defaultTitleColor
                }`}
              >
                <div className="form__entry-name mb-1 text-slate-100">
                  Step Sort Weight<span className="text-rose-500">*</span>
                </div>
              </Label>
              <NumberField
                {...register(`${stepsArrayName}.${index}.stepSortWeight`)}
                className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                validation={{ required: true }}
                min="1"
              />
              {errors[stepsArrayName]?.[index]?.stepSortWeight?.type ===
                'required' && requiredFieldError('Step Sort Weight')}
              {errors?.[stepsArrayName]?.root?.type ===
                'duplicateSortWeight' && (
                <p className="rw-field-error">
                  Steps must have unique sort weight
                </p>
              )}
            </div> */}

            <div
              id={`${index}-step-type-guide`}
              className="form__entry mb-12 hidden"
            >
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
                    <div className="form__entry-name mb-1 text-slate-100">
                      Passcode<span className="text-rose-500">*</span>
                    </div>
                  </Label>
                  <TextField
                    placeholder="The passcode can be only letters and numbers."
                    {...register(`${stepsArrayName}.${index}.solution`)}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                    validation={{ required: true, pattern: /^[a-zA-Z0-9]+$/ }}
                  />
                  {Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][index] &&
                    'solution' in errors[stepsArrayName][index] &&
                    'type' in errors[stepsArrayName][index].solution &&
                    errors[stepsArrayName][index].solution.type ===
                      'required' &&
                    requiredFieldError('a passcode')}
                  {Array.isArray(errors[stepsArrayName]) &&
                    errors[stepsArrayName][index] &&
                    'solution' in errors[stepsArrayName][index] &&
                    'type' in errors[stepsArrayName][index].solution &&
                    errors[stepsArrayName][index].solution.type ===
                      'pattern' && (
                      <div className="form__error pt-1 font-medium text-rose-300">
                        The passcode can be only letters or numbers
                      </div>
                    )}
                </div>
              </div>
            )}
            {stepTypeVal === 'NFT_CHECK' && (
              <div className="step__type">
                <div className="form__entry mb-12">
                  <Label
                    name="requireAllNfts"
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">
                      Require All NFTs
                    </div>
                  </Label>
                  <CheckboxField
                    {...register(`${stepsArrayName}.${index}.requireAllNfts`)}
                    className="form__text-field mt-1 mb-10 box-border block bg-stone-200 text-slate-700"
                  />
                </div>

                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">
                      Contract Address
                    </div>
                  </Label>
                  <TextField
                    placeholder="Contract Address"
                    {...register(
                      `${stepsArrayName}.${index}.nftCheckData.0.contractAddress`
                    )}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                  />
                </div>
                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">Chain Id</div>
                  </Label>
                  <TextField
                    placeholder="Chain Id"
                    {...register(
                      `${stepsArrayName}.${index}.nftCheckData.0.chainId`
                    )}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                  />
                </div>
                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">Token Id</div>
                  </Label>
                  <TextField
                    placeholder="Token Id"
                    {...register(
                      `${stepsArrayName}.${index}.nftCheckData.0.tokenId`
                    )}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                  />
                </div>
                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">POAP Event Id</div>
                  </Label>
                  <TextField
                    placeholder="POAP Event Id"
                    {...register(
                      `${stepsArrayName}.${index}.nftCheckData.0.poapEventId`
                    )}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                  />
                </div>
              </div>
            )}
            {stepTypeVal === 'FUNCTION_CALL' && (
              <div className="step__type">
                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">Method Ids</div>
                  </Label>
                  <TextField
                    placeholder="Method Ids"
                    {...register(`${stepsArrayName}.${index}.methodIds`)}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                  />
                </div>
                <div className="form__entry mb-12">
                  <Label
                    name={stepTypeVal}
                    className="form__label text-slate-100"
                  >
                    <div className="form__entry-name mb-1">
                      Contract Address
                    </div>
                  </Label>
                  <TextField
                    placeholder="Contract Address"
                    {...register(`${stepsArrayName}.${index}.contractAddress`)}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
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
                    <div className="form__entry-name mb-1">
                      Contract Address
                    </div>
                  </Label>
                  <TextField
                    placeholder="Contract Address"
                    {...register(`${stepsArrayName}.${index}.contractAddress`)}
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
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
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
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
                                errors[stepsArrayName][index].ranges[
                                  tokenIdIndex
                                ]?.startId
                                  ? errorTitleColor
                                  : defaultTitleColor
                              }`}
                            >
                              <div className="form__entry-name mb-1">
                                Start ID
                              </div>
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
                              errors[stepsArrayName][index]?.ranges?.[
                                tokenIdIndex
                              ]?.startId?.type === 'required' &&
                              requiredFieldError('a Start ID')}
                          </div>

                          <div id="end-id" className="form__entry mb-12">
                            <Label
                              name={`${stepsArrayName}.${index}.ranges.${tokenIdIndex}.endId`}
                              className={`${defaultStyles} ${
                                Array.isArray(errors[stepsArrayName]) &&
                                errors[stepsArrayName][index]?.ranges &&
                                errors[stepsArrayName][index].ranges[
                                  tokenIdIndex
                                ]?.endId
                                  ? errorTitleColor
                                  : defaultTitleColor
                              }`}
                            >
                              <div className="form__entry-name mb-1">
                                End ID
                              </div>
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
                              errors[stepsArrayName][index]?.ranges?.[
                                tokenIdIndex
                              ]?.endId?.type === 'required' &&
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

            <div id={`${index}-solution-hint`} className="form__entry mb-12">
              <Label
                name={`solutionHint.${index}`}
                className={`${defaultStyles} ${
                  errors[stepsArrayName]?.[index]?.solutionHint?.type ===
                  'required'
                    ? errorTitleColor
                    : defaultTitleColor
                }`}
              >
                <div className="form__entry-name mb-1 text-slate-100">Hint</div>
              </Label>
              <TextField
                placeholder="Make your hint helpful but don’t spoil the puzzle."
                {...register(`${stepsArrayName}.${index}.solutionHint`)}
                className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
              />
            </div>

            <div id={`${index}-default-image`} className="form__entry mb-12">
              <Label
                name={`defaultImage.${index}`}
                className={`${defaultStyles} ${
                  errors[stepsArrayName]?.[index]?.defaultImage?.type ===
                  'required'
                    ? errorTitleColor
                    : defaultTitleColor
                }`}
                errorClassName="form__label--error text-rose-300"
              >
                <p className="form__entry-name mb-1 text-slate-100">
                  Step Image
                </p>
              </Label>

              <TextField
                placeholder="https://"
                {...register(`${stepsArrayName}.${index}.defaultImage`)}
                className="form__text-field border-1 mb-8 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                validation={{ pattern: imageLinkPattern }}
              />

              {getValues(`${stepsArrayName}.${index}.defaultImage`) && (
                <DisplayImage
                  src={getValues(`${stepsArrayName}.${index}.defaultImage`)}
                />
              )}
              {errors[stepsArrayName]?.[index]?.defaultImage?.type ===
                'required' && requiredFieldError('Default Image')}
              {errors[stepsArrayName]?.[index]?.defaultImage?.type ===
                'pattern' && imageLinkPatternError('default image')}
            </div>

            <div className="my-8">
              <Button
                type="button"
                borderWhite
                round
                onClick={() => remove(index)}
                disabled={getValues('steps').length === 1}
              >
                <span className="flex items-center gap-2 text-xs">
                  <TrashIcon className="h-5 w-5" /> Delete Step {index + 1}
                </span>
              </Button>
            </div>

            {errors?.[stepsArrayName]?.[index]?.stepPage?.root?.type ===
              'required' && (
              <div className="rw-field-error">
                You must have at least one step page in a step!
              </div>
            )}
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  )
}

// This type definition is used in the PuzzleForm component below
// It does not get used in the Step component above
type PuzzleFormType = {
  rewardable: {
    name: CreateRewardableInput['name']
    // successMessage: CreateRewardableInput['successMessage']
    listPublicly: CreateRewardableInput['listPublicly']
    nft: {
      name: string
      image: string
    }
  }
  puzzle: {
    coverImage: CreatePuzzleInput['coverImage']
    requirements: CreatePuzzleInput['requirements']
  }
  steps: CreateAllStepTypesInput[]
}

const emptyFormValues: PuzzleFormType = {
  puzzle: {
    coverImage: '',
    requirements: ['DETAIL'],
  },
  rewardable: {
    name: '',
    listPublicly: false,
    nft: {
      image: '',
      name: '',
    },
  },
  steps: [buildEmptyStep()],
}

export default function PuzzleForm({
  initialValues,
  isEditMode = false,
  onFormSubmit,
  submissionError,
  submissionPending,
}: {
  initialValues?: PuzzleFormType
  isEditMode?: boolean
  onFormSubmit: (
    variables:
      | CreateRewardableMutationVariables
      | Omit<EditRewardableMutationVariables, 'rewardableId' | 'puzzleId'>,
    onSuccess?: () => void
  ) => void
  submissionError?: ApolloError
  submissionPending?: boolean
}) {
  const [selectedTab, setSelectedTab] = useState(0)
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
        listPublicly: initialValues?.rewardable?.listPublicly,
        // successMessage: initialValues?.rewardable?.successMessage,
        nft: {
          name: initialValues?.rewardable?.nft?.name,
        },
      },
      puzzle: {
        coverImage: initialValues?.puzzle?.coverImage,
        requirements: initialValues?.puzzle?.requirements || ['DETAIL'],
      },
    },
  })

  const { errors } = formMethods.formState

  useEffect(() => {
    if (!isEmpty(errors)) {
      console.error(errors)
    }
  }, [errors])

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

  const { clear: clearPersistance } = useFormPersist(LOCAL_STORAGE_KEY, {
    watch: formMethods.watch,
    setValue: formMethods.setValue,
    storage: window.localStorage,
    exclude: isEditMode ? ['rewardable', 'puzzle', 'steps'] : [],
  })

  const onSubmit = async (input: PuzzleFormType) => {
    await onFormSubmit(
      {
        input: {
          name: input.rewardable.name,
          type: 'PUZZLE', // hard coded for now
          // successMessage: input.rewardable.successMessage,
          listPublicly: input.rewardable.listPublicly,
          nft: {
            name: input.rewardable.nft.name,
            image: input.rewardable.nft.image,
          },
          puzzle: {
            rewardableId: 'ignore me',
            requirements: input.puzzle.requirements,
            coverImage: input.puzzle.coverImage,
            steps: input.steps.map((step, stepIndex) => {
              const commonStepFields = {
                puzzleId: 'ignore me',
                stepSortWeight: stepIndex + 1,
                solutionHint: step.solutionHint,
                defaultImage: step.defaultImage || input.puzzle.coverImage,
                // solutionImage: step.solutionImage,
                stepGuideType: step.stepGuideType,
                stepPage: step.stepPage?.map((page, pageIndex) => ({
                  sortWeight: pageIndex + 1,
                  showStepGuideHint: step.stepPage?.length === pageIndex + 1,
                  body: page.body,
                })),
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
      },
      () => {
        if (!isEditMode) {
          formMethods.reset(emptyFormValues)
          clearPersistance()
        }
      }
    )
  }

  return (
    <div className="form min-h-[calc(100vh-80px)] px-4 pb-16">
      <div className="my-8 p-2 text-center text-3xl tracking-wide">
        {isEditMode ? 'Edit Your Puzzle' : 'Create a New Puzzle'}
      </div>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <div className="border-b-2 border-gray-700">
          <Tab.List className="flex translate-y-[2px] justify-center gap-8">
            <TabLabel>Description</TabLabel>
            <TabLabel>Steps</TabLabel>
            <TabLabel>Summary</TabLabel>
          </Tab.List>
        </div>
        <div className="mx-auto max-w-md pt-9">
          <Form formMethods={formMethods} onSubmit={onSubmit}>
            <Tab.Panels>
              <Tab.Panel unmount={false}>
                <div id="puzzle-name" className="form__entry mb-12">
                  <Label
                    name="rewardable.name"
                    className="form__label text-slate-100"
                    errorClassName="form__label--error text-rose-300"
                  >
                    <div className="form__entry-name">
                      Name<span className="text-rose-500">*</span>
                    </div>
                  </Label>
                  <TextField
                    name="rewardable.name"
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                    placeholder="Pick a name for your puzzle!"
                    validation={{ required: true }}
                  />
                  {errors.rewardable?.name?.type === 'required' &&
                    requiredFieldError('a Name')}
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
              className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
              placeholder="Explanation"
              validation={{ required: true }}
            />
            {errors.rewardable?.explanation?.type === 'required' &&
              requiredFieldError('an Explanation')}
          </div> */}

                {/* <div id="puzzle-success-message" className="form__entry mb-12">
                  <Label
                    name="rewardable.successMessage"
                    className="form__label text-slate-100"
                    errorClassName="form__label--error text-rose-300"
                  >
                    <div className="form__entry-name mb-1">Success Message</div>
                  </Label>
                  <TextAreaField
                    name="rewardable.successMessage"
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                    placeholder="Compose a success message the user will see when solving your puzzle."
                  />
                </div> */}

                <div
                  id="puzzle-requirements"
                  className="form__entry mb-12 hidden"
                >
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
                      className="border-1 h-[72px] rounded-md border-slate-300 bg-transparent text-slate-200"
                      validation={{ required: true }}
                      value={['DETAIL']}
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
                      Puzzle Image<span className="text-rose-500">*</span>
                    </div>
                  </Label>
                  <TextField
                    name="puzzle.coverImage"
                    className="form__text-field border-1 mb-8 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                    placeholder="https://"
                    validation={{
                      required: true,
                      pattern: imageLinkPattern,
                    }}
                  />
                  {errors.puzzle?.coverImage?.type === 'required' &&
                    requiredFieldError('a cover image')}
                  {errors.puzzle?.coverImage?.type === 'pattern' &&
                    imageLinkPatternError('cover image')}

                  {formMethods.getValues('puzzle.coverImage') && (
                    <DisplayImage
                      src={formMethods.getValues('puzzle.coverImage')}
                    />
                  )}
                </div>

                <div id="nft-name" className="form__entry mb-12">
                  <Label
                    name="rewardable.nft.name"
                    className="form__label text-slate-100"
                    errorClassName="form__label--error text-rose-300"
                  >
                    <p className="form__entry-name mb-1">
                      NFT Name<span className="text-rose-500">*</span>
                    </p>
                  </Label>
                  <TextField
                    name="rewardable.nft.name"
                    className="form__text-field border-1 box-border block w-full rounded-md border-slate-300 bg-transparent p-3 text-slate-200 placeholder-slate-400 sm:w-full md:max-w-md"
                    placeholder="NFT Name"
                    validation={{ required: true }}
                  />
                  {errors.rewardable?.nft?.name?.type === 'required' &&
                    requiredFieldError('an nft name')}
                </div>

                <div id="nft-image" className="form__entry mb-12">
                  <Label
                    name="rewardable.nft.image"
                    className="form__label text-slate-100"
                    errorClassName="form__label--error text-rose-300"
                  >
                    <p className="form__entry-name mb-1">
                      NFT Image<span className="text-rose-500">*</span>
                    </p>
                    <p className="mb-2 text-sm font-normal italic text-slate-400">
                      Image must be smaller than 5MB
                    </p>
                  </Label>

                  <div className="mt-4">
                    <Controller
                      control={formMethods.control}
                      name="rewardable.nft.image"
                      rules={{ required: true }}
                      defaultValue={
                        isEditMode ? initialValues?.rewardable.nft.image : ''
                      }
                      render={({ field: { onChange, value } }) => {
                        return (
                          <CloudinaryUploadWidget
                            setNftImage={onChange}
                            nftImage={value}
                          />
                        )
                      }}
                    />
                  </div>

                  {errors.rewardable?.nft?.image?.type === 'required' &&
                    requiredFieldError('an nft image')}
                  {errors.rewardable?.nft?.image?.type === 'imageSize' && (
                    <p className="form__error pt-1 font-medium text-rose-800">
                      Please select an image smaller than 1MB
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    round
                    solid
                    onClick={() => setSelectedTab(1)}
                  >
                    Continue to Steps
                  </Button>
                </div>
              </Tab.Panel>

              <Tab.Panel unmount={false}>
                <div className="border-t border-stone-50">
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
                </div>

                {formMethods.getValues('steps').length < 3 && (
                  <div className="border-b border-stone-50 py-4">
                    <button
                      type="button"
                      className="block"
                      onClick={() => append(buildEmptyStep(fields.length + 1))}
                    >
                      <span className="flex items-center gap-2">
                        <PlusCircleIcon className="h-6 w-6 fill-transparent" />{' '}
                        Add Step
                      </span>
                    </button>
                  </div>
                )}
                {errors?.[stepsArrayName]?.root?.type === 'required' && (
                  <div className="rw-field-error">
                    You must have at least one step in a puzzle!
                  </div>
                )}
                <div className="mt-12 flex justify-center">
                  <Button
                    type="button"
                    round
                    solid
                    onClick={() => setSelectedTab(2)}
                  >
                    Continue to Summary
                  </Button>
                </div>
              </Tab.Panel>

              <Tab.Panel unmount={false}>
                <div>
                  <div className="mb-8 border-b border-stone-700 pb-8">
                    <p className="mb-4 italic text-stone-400">Puzzle</p>
                    {formMethods.getValues('puzzle.coverImage') && (
                      <DisplayImage
                        src={formMethods.getValues('puzzle.coverImage')}
                      />
                    )}
                    <p className="my-8 text-3xl">
                      {formMethods.getValues('rewardable.name')}
                    </p>

                    <div className="flex flex-col gap-4">
                      {formMethods.getValues('steps').map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="rounded border border-white/10"
                        >
                          <p className="bg-white/10 p-2 text-sm italic text-stone-100">
                            Step {stepIndex + 1}
                          </p>

                          {step.defaultImage &&
                            step.defaultImage !==
                              formMethods.getValues('puzzle.coverImage') && (
                              <DisplayImage src={step.defaultImage} />
                            )}

                          <div className="p-4 pt-0">
                            {step.stepPage.map((page, pageIndex) => (
                              <div
                                className="mt-4 text-sm text-stone-300"
                                key={`step-${stepIndex}-stepPage-${pageIndex}`}
                              >
                                <p>{page.body}</p>
                              </div>
                            ))}

                            {step.solutionHint && (
                              <p className="mt-8 flex items-center gap-2">
                                <span>
                                  <LightBulbIcon className="h-4 w-4" />
                                </span>
                                {step.solutionHint}
                              </p>
                            )}

                            {'solution' in step && step.solution && (
                              <p
                                className={clsx(
                                  'flex items-center gap-2 text-brand-accent-secondary',
                                  step.solutionHint ? 'mt-2' : 'mt-8'
                                )}
                              >
                                <span>
                                  <KeyIcon className="h-4 w-4" />
                                </span>{' '}
                                {step.solution}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mb-4 italic text-stone-400">NFT Reward</p>
                  {formMethods.getValues('rewardable.nft.image') && (
                    <DisplayImage
                      src={formatImageSrc(
                        formMethods.getValues('rewardable.nft.image')
                      )}
                    />
                  )}
                  <p className="mt-8 text-3xl">
                    {formMethods.getValues('rewardable.nft.name')}
                  </p>
                </div>
                <div className="mt-12 flex flex-col items-center justify-center gap-6">
                  <Submit
                    disabled={submissionPending || !isEmpty(errors)}
                    className={generateButtonClasses({
                      round: true,
                      solid: !!formMethods.getValues('rewardable.listPublicly'),
                      disabled: submissionPending || !isEmpty(errors),
                    })}
                  >
                    {formMethods.getValues('rewardable.listPublicly')
                      ? 'Launch Puzzle'
                      : 'Save Draft'}
                  </Submit>

                  <div id="puzzle-list-publicly" className="form__entry">
                    <div className="flex items-center justify-center gap-2">
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
                    <p className="mt-1 flex items-center gap-1 text-sm text-stone-400">
                      <InformationCircleIcon className="h-5 w-5 fill-transparent" />
                      {formMethods.getValues('rewardable.listPublicly')
                        ? 'This puzzle will show on the "play" page for all users.'
                        : 'This puzzle will only be accessible via direct link.'}
                    </p>
                  </div>

                  {!isEmpty(errors) && (
                    <p className="text-center text-rose-300">
                      There is an error with the form. Please make sure all
                      required fields are present and formatted correctly.
                    </p>
                  )}

                  <FormError error={submissionError} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Form>
        </div>
      </Tab.Group>
      {submissionPending && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-brand-gray-primary/90">
          <LoadingIcon />
        </div>
      )}
    </div>
  )
}
