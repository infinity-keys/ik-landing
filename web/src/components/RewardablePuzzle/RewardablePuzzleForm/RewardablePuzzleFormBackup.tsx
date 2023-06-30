// import { DevTool } from '@hookform/devtools'
import { CreateRewardableInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  RadioField,
  Submit,
  useForm,
  useFieldArray,
  SubmitHandler,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import NftForm from 'src/components/Nft/NftForm/NftForm'
import RewardableConnectionForm from 'src/components/RewardableConnection/RewardableConnectionForm/RewardableConnectionForm'
import StepForm from 'src/components/Step/StepForm/StepForm'
interface RewardableFormProps {
  onSave: (data: CreateRewardableInput) => void
  error: RWGqlError
  loading: boolean
}

/*
 * @TODO
 * nft field should be required and the nft form itself should be optional
 * connect pack and puzzle
 */

const RewardableForm = (props: RewardableFormProps) => {
  const formMethods = useForm<CreateRewardableInput>()
  const { control } = formMethods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  })

  const onSubmit: SubmitHandler<CreateRewardableInput> = (data) => {
    const { nft, ...rest } = data
    const filteredData = nft.tokenId !== null ? data : rest

    // this is where we delete the unwanted `id` field that is being added
    // by the `useFieldArray` hook which our middleware is rejecting
    const transformedFields = fields.map(({ id: _id, ...rest }) => rest)

    if (data.type === 'PUZZLE' && fields.length === 0) {
      alert('Puzzles need at least one step')
      return
    }

    if (data.type === 'PACK' && fields.length > 0) {
      alert(
        'Pack is selected but steps are present. Please remove steps or select Puzzle'
      )
      return
    }

    if (data.type === 'PACK') {
      const { rewardableConnection: _, ...rest } = filteredData
      props.onSave(rest)
    } else {
      const { rewardableConnection, ...rest } = filteredData

      const withSteps = rewardableConnection?.parentId
        ? { ...filteredData, steps: transformedFields }
        : { ...rest, steps: transformedFields }

      props.onSave(withSteps)
    }

    formMethods.reset()
  }

  const addStep = (data) => {
    const duplicate = fields.some(
      ({ stepSortWeight }) => stepSortWeight === data.stepSortWeight
    )
    if (duplicate) {
      alert('Duplicate stepSortWeight')
    } else {
      const strippedData = { ...data }
      append(strippedData)
    }
  }

  const deleteStep = (id) => {
    const index = fields.findIndex((step) => step.stepSortWeight === id)
    if (index !== -1) {
      remove(index)
    }
  }

  return (
    <div>
      <div className="text-sm">
        <h2 className="mb-8 text-4xl font-bold">Add Steps</h2>

        <div className="flex items-start gap-12">
          <div className="rw-form-wrapper flex-1">
            <StepForm onSave={addStep} />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-8">
            {fields.map((step) => (
              <div className="border p-2" key={step.stepSortWeight}>
                <button
                  onClick={() => deleteStep(step.stepSortWeight)}
                  className="ml-auto block bg-red-300 px-2 py-1 leading-[1] hover:bg-red-500"
                >
                  x
                </button>
                {Object.entries(step).map((entry) => (
                  <p key={entry[0]}>
                    <span className="mr-2 text-sm">{entry[0]}:</span>{' '}
                    <span className="break-word text-sm font-bold">
                      {JSON.stringify(entry[1], null, 2)}
                    </span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rw-form-wrapper mt-12 border-t">
        {/* <DevTool control={formMethods.control} /> */}
        <Form onSubmit={onSubmit} error={props.error} formMethods={formMethods}>
          <div className="flex gap-12">
            <div className="flex-1">
              <h2 className="my-8 text-4xl font-bold">Add Rewardable</h2>

              <FormError
                error={props.error}
                wrapperClassName="rw-form-error-wrapper"
                titleClassName="rw-form-error-title"
                listClassName="rw-form-error-list"
              />
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

              <FieldError name="name" className="rw-field-error" />

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

              <FieldError name="slug" className="rw-field-error" />

              {/* <TextField name="kittens" /> */}

              <Label
                name="explanation"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Explanation
              </Label>

              <TextField
                name="explanation"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{ required: true }}
              />

              <FieldError name="explanation" className="rw-field-error" />

              <Label
                name="successMessage"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Success message
              </Label>

              <TextField
                name="successMessage"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />

              <FieldError name="successMessage" className="rw-field-error" />

              <Label
                name="listPublicly"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                List publicly
              </Label>

              <CheckboxField
                name="listPublicly"
                className="rw-input w-12"
                errorClassName="rw-input rw-input-error"
              />

              <FieldError name="listPublicly" className="rw-field-error" />

              <Label
                name="type"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Type
              </Label>

              <div className="rw-check-radio-items">
                <RadioField
                  id="rewardable-type-0"
                  name="type"
                  defaultValue="PUZZLE"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                />
                <div>Puzzle</div>
              </div>

              <div className="rw-check-radio-items">
                <RadioField
                  id="rewardable-type-1"
                  name="type"
                  defaultValue="PACK"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                />
                <div>Pack</div>
              </div>

              <div className="rw-check-radio-items">
                <RadioField
                  id="rewardable-type-2"
                  name="type"
                  defaultValue="BUNDLE"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                />
                <div>Bundle</div>
              </div>

              <FieldError name="type" className="rw-field-error" />

              <RewardableConnectionForm />
            </div>

            <div className="flex-1">
              <h2 className="mt-8 text-4xl font-bold">Add NFT</h2>
              <NftForm />
            </div>
          </div>
          <div className="rw-button-group">
            <Submit
              disabled={props.loading}
              className="rw-button rw-button-blue"
            >
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RewardableForm
