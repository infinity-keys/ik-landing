import { useRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'

import {
  Form,
  useForm,
  Label,
  SelectField,
  Submit,
  TextField,
  useFieldArray,
  useWatch,
  UseFormRegister,
  UseFormWatch,
  UseFieldArrayUpdate,
} from '@redwoodjs/forms'

const stepsArrayName = 'stepsArray'

// const startingSteps: Step[] = [{ message: 'step 1' }, { message: 'step 2' }]
const startingSteps: Step[] = []

type StepType = 'SIMPLE_TEXT' | 'NFT_CHECK'

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
  update,
}: {
  index: number
  register: UseFormRegister<PuzzleFormType>
  watch: UseFormWatch<PuzzleFormType>
  update: UseFieldArrayUpdate<PuzzleFormType, 'stepsArray'>
}) {
  // Watch for select val changing
  const stepTypeVal = watch(`${stepsArrayName}.${index}.type`)

  return (
    <fieldset className="flex">
      <TextField
        placeholder="Fail Message"
        {...register(`${stepsArrayName}.${index}.failMessage`)}
        className="block bg-inherit"
      />

      <SelectField {...register(`${stepsArrayName}.${index}.type`)}>
        <option value="SIMPLE_TEXT">Simple Text</option>
        <option value="NFT_CHECK">NFT check</option>
      </SelectField>

      {stepTypeVal === 'SIMPLE_TEXT' && (
        <TextField
          placeholder="Solution"
          {...register(`${stepsArrayName}.${index}.solution`)}
          className="block bg-inherit"
        />
      )}

      {stepTypeVal === 'NFT_CHECK' && (
        <TextField
          placeholder="NFT ID"
          {...register(`${stepsArrayName}.${index}.nftId`)}
          className="block bg-inherit"
        />
      )}

      <button
        type="button"
        onClick={() => {
          // update goes here
        }}
      >
        Update
      </button>
    </fieldset>
  )
}

type PuzzleFormType = {
  name: string
  slug: string
  stepsArray: (StepSimpleText | StepNftCheck)[]
}
export default function PuzzleForm() {
  const formMethods = useForm<PuzzleFormType>({
    defaultValues: {
      [stepsArrayName]: startingSteps,
    },
  })

  const { fields, append, update } = useFieldArray({
    control: formMethods.control,
    name: stepsArrayName,
  })

  console.log(formMethods.getValues())

  return (
    <Form formMethods={formMethods}>
      <TextField name="name" className="block bg-inherit" placeholder="name" />
      <TextField name="slug" className="block bg-inherit" placeholder="slug" />

      <h1 className="mt-8">Steps go below</h1>

      {fields.map((field, index) => (
        <Step
          index={index}
          register={formMethods.register}
          key={field.id}
          watch={formMethods.watch}
          update={update}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({ type: 'SIMPLE_TEXT', failMessage: '', solution: '' })
        }
      >
        Add Step
      </button>
    </Form>
  )
}

// type Step = {
//   failMessage: string
//   successMessage: string
//   stepType: 'SIMPLE_TEXT' | 'NFT_CHECK' | undefined
// } & StepTypeData

// type SimpleText = {
//   solution: string
// }

// const stepsFieldArrayName = 'stepsArray'

// type NftCheck = {
//   contractAddress: string
//   chainId: string
// }

// type StepTypeData = SimpleText | NftCheck

// const DisplayStepType = ({
//   stepType,
//   data,
// }: {
//   stepType: Step['stepType']
//   data: StepTypeData
// }) => {
//   switch (stepType) {
//     case 'SIMPLE_TEXT':
//       return 'solution' in data ? (
//         <div className="font-bold">Solution: {data.solution}</div>
//       ) : null
//     case 'NFT_CHECK':
//       return 'contractAddress' in data && 'chainId' in data ? (
//         <div className="font-bold">
//           <div>Contract Address: {data.contractAddress}</div>
//           <div>Chain ID: {data.chainId}</div>
//         </div>
//       ) : null
//     default:
//       return null
//   }
// }

// DisplayStepType.displayName = 'DisplayStepType'

// const DisplayStep = ({
//   control,
//   index,
// }: {
//   control: Control<PuzzleFormType>
//   index: number
// }) => {
//   const data = useWatch({
//     control,
//     name: `${stepsFieldArrayName}.${index}`,
//   })

//   console.log(data)

//   if (!data) return null

//   return (
//     <div className="my-4 border-2 border-zinc-500 bg-gray-100 p-4">
//       <h3 className="font-bold italic">State:</h3>
//       <div className="font-bold">Fail message: {data?.failMessage}</div>
//       <div className="font-bold">Success message: {data?.successMessage}</div>
//       <DisplayStepType stepType={data.stepType} data={data} />
//     </div>
//   )
// }

// const EditNftCheck = ({ value }: { value: Step }) => {
//   const { register } = useForm<Step>({
//     defaultValues: value,
//   })

//   return (
//     <div className="nft-check">
//       <Label
//         name="contractAddress"
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Contract Address
//       </Label>
//       <TextField
//         className="w-full"
//         placeholder="Contract Address"
//         {...register('contractAddress', { required: true })}
//       />

//       <Label
//         name="chainId"
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Chain ID
//       </Label>
//       <TextField
//         className="w-full"
//         placeholder="Chain ID"
//         {...register('chainId', { required: true })}
//       />
//     </div>
//   )
// }

// /**
//  * Specifically the Simple Text field that shows after selection in parent Step
//  */
// const EditSimpleText = ({ value }: { value: Step }) => {
//   const { register, control } = useForm<Step>({
//     defaultValues: value,
//   })

//   return (
//     <div className="simple-text">
//       <Label
//         name="solution"
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Solution
//       </Label>
//       <TextField
//         className="w-full"
//         placeholder="Solution"
//         {...register('solution', { required: true })}
//       />
//     </div>
//   )
// }

// /**
//  * Overall step component
//  */
// const EditStep = ({
//   updateStep,
//   removeStep,
//   index,
//   value,
//   control,
// }: {
//   updateStep: (index: number, data: Step) => void
//   removeStep: (index: number) => void
//   index: number
//   value: Step
//   control: Control<PuzzleFormType>
// }) => {
//   const { handleSubmit, watch, register } = useForm<Step>({
//     defaultValues: value,
//   })
//   const stepType = watch('stepType')

//   // const onSubmit = (data: Step) => {
//   //   updateStep(index, data)
//   // }

//   return (
//     <div className="my-4 max-w-3xl border-2 border-zinc-500 bg-zinc-300 p-4">
//       {process.env.NODE_ENV === 'development' && <DevTool control={control} />}

//       {/* <DisplayStep control={control} index={index} /> */}

//       <Label
//         name={`failMessage-${index}`}
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Fail message
//       </Label>
//       <TextField
//         className="w-full"
//         placeholder=""
//         {...register('failMessage', { required: true })}
//       />

//       <Label
//         name={`successMessage-${index}`}
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Success message
//       </Label>
//       <TextField
//         className="w-full"
//         placeholder=""
//         {...register('successMessage', { required: true })}
//       />

//       <Label
//         name={`stepType-${index}`}
//         className="rw-label"
//         errorClassName="rw-label rw-label-error"
//       >
//         Step Type
//       </Label>
//       <SelectField
//         className="rw-input"
//         errorClassName="rw-input rw-input-error"
//         {...register('stepType', { required: true })}
//       >
//         <option value="">Select a step type</option>
//         <option value="SIMPLE_TEXT">Simple Text</option>
//         <option value="NFT_CHECK">NFT Check</option>
//       </SelectField>

//       {stepType === 'SIMPLE_TEXT' && <EditSimpleText value={value} />}

//       {stepType === 'NFT_CHECK' && <EditNftCheck value={value} />}

//       <Submit
//         className="rw-button-group rw-button rw-button-blue"
//         onClick={handleSubmit((data) => {
//           updateStep(index, data)
//         })}
//       >
//         Add Step to State
//       </Submit>
//       <button
//         className="rw-button-group rw-button rw-button-blue"
//         type="button"
//         onClick={() => removeStep(index)}
//       >
//         Remove
//       </button>
//     </div>
//   )
// }

// type PuzzleFormType = {
//   name: string
//   slug: string
//   stepsArray: Step[]
// }

// export default function PuzzleForm() {
//   const formMethods = useForm<PuzzleFormType>({
//     defaultValues: {
//       [stepsFieldArrayName]: [],
//     },
//   })

//   const {
//     fields: stepFields,
//     append: appendStep,
//     update: updateStep,
//     remove: removeStep,
//   } = useFieldArray({
//     control: formMethods.control,
//     name: stepsFieldArrayName,
//   })

//   const renderCount = useRef(1)

//   const onSubmit = (data: PuzzleFormType) => {
//     console.log(data)
//   }

//   useEffect(() => {
//     {
//       process.env.NODE_ENV === 'development' &&
//         (renderCount.current = renderCount.current + 1)
//     }
//   })

//   return (
//     <div>
//       <div className="m-4 inline-block bg-pink-200 p-2 text-lg text-red-800">
//         Times this component has rendered: <b>{renderCount.current}</b>
//       </div>
//       <div className="rw-segment">
//         <header className="rw-segment-header">
//           <h2 className="rw-heading rw-heading-secondary">
//             Welcome to the Puzzle Creation Form
//           </h2>
//         </header>
//         <div className="rw-segment-main text-gray-500">
//           <div>
//             {process.env.NODE_ENV === 'development' && (
//               <DevTool control={formMethods.control} />
//             )}
//             <Form formMethods={formMethods} onSubmit={onSubmit}>
//               <div className="max-w-3xl">
//                 <h2 className="my-8 text-4xl font-bold">Create a Puzzle</h2>
//                 <Label
//                   name="name"
//                   className="rw-label"
//                   errorClassName="rw-label rw-label-error"
//                 >
//                   Name
//                 </Label>
//                 <TextField
//                   name="name"
//                   className="rw-input"
//                   errorClassName="rw-input rw-input-error"
//                   validation={{ required: true }}
//                 />

//                 <Label
//                   name="slug"
//                   className="rw-label"
//                   errorClassName="rw-label rw-label-error"
//                 >
//                   Slug
//                 </Label>
//                 <TextField
//                   name="slug"
//                   className="rw-input"
//                   errorClassName="rw-input rw-input-error"
//                   validation={{ required: true }}
//                 />
//               </div>

//               {stepFields.map((field, index) => (
//                 <fieldset key={field.id}>
//                   <EditStep
//                     control={formMethods.control}
//                     updateStep={updateStep}
//                     removeStep={removeStep}
//                     index={index}
//                     value={field}
//                   />
//                 </fieldset>
//               ))}

//               <div className="rw-button-group">
//                 <button
//                   type="button"
//                   className="rw-button rw-button-blue"
//                   onClick={() => {
//                     appendStep({
//                       failMessage: '',
//                       successMessage: '',
//                       stepType: undefined, // start with undefined so that the select field is empty
//                       solution: '',
//                       contractAddress: '',
//                       chainId: '',
//                     })
//                   }}
//                 >
//                   Add Step
//                 </button>
//               </div>
//               <div className="rw-button-group">
//                 <Submit className="rw-button-group rw-button rw-button-blue">
//                   Save Puzzle to Database
//                 </Submit>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
