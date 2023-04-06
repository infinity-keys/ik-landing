import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'

import type { EditStepById, StepType, UpdateStepInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useState } from 'react'
import StepNftCheckForm from 'src/components/Step/StepForm/StepNftCheckForm'
import StepSimpleTextForm from './StepSimpleTextForm'
import StepTokenIdRangeForm from './StepTokenIdRangeForm'
import StepFunctionCallForm from './StepFunctionCallForm'

type FormStep = NonNullable<EditStepById['step']>

interface StepFormProps {
  step?: EditStepById['step']
  onSave: (data: UpdateStepInput, id?: FormStep['id']) => void
  error?: RWGqlError
  loading?: boolean
}

const StepForm = (props: StepFormProps) => {
  const [stepType, setStepType] = useState()
  const [stepTypeData, setStepTypeData] = useState()
  const formMethods = useForm()

  const onSubmit = (data: FormStep) => {
    const stepTypeDataNoEmptyFields = Object.fromEntries(
      Object.entries(data.stepTypeData).filter(
        ([_, v]) => v !== null && v !== ''
      )
    )

    let formattedData = { ...data, stepTypeData: stepTypeDataNoEmptyFields }

    if (data.type === 'FUNCTION_CALL') {
      const methodIds = formattedData.stepTypeData.methodIds
        .split(',')
        .map((methodId) => methodId.trim())

      formattedData = {
        ...formattedData,
        stepTypeData: { ...formattedData.stepTypeData, methodIds },
      }
    }

    console.log(formattedData)

    props.onSave(formattedData, props?.step?.id)
    formMethods.reset()
  }

  const handleSetStepType = (event) => {
    setStepType(event.target.value)
  }

  const addStepTypeData = (data) => {
    if (data.type === 'FUNCTION_CALL') {
      const methodIds = data.methodIds.split(',').trim()
      console.log('methodIds: ', methodIds)
    }
    setStepTypeData(data)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormStep>
        formMethods={formMethods}
        onSubmit={onSubmit}
        error={props.error}
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="failMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Fail message
        </Label>

        <TextField
          name="failMessage"
          defaultValue={props.step?.failMessage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="failMessage" className="rw-field-error" />

        <Label
          name="successMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Success message
        </Label>

        <TextField
          name="successMessage"
          defaultValue={props.step?.successMessage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="successMessage" className="rw-field-error" />

        <Label
          name="challenge"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Challenge
        </Label>

        <TextField
          name="challenge"
          defaultValue={props.step?.challenge}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="challenge" className="rw-field-error" />

        <Label
          name="resourceLinks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Resource links
        </Label>

        <TextField
          name="resourceLinks"
          defaultValue={props.step?.resourceLinks}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resourceLinks" className="rw-field-error" />

        <Label
          name="stepSortWeight"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Step sort weight
        </Label>

        <NumberField
          name="stepSortWeight"
          defaultValue={props.step?.stepSortWeight}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="stepSortWeight" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-0"
            name="type"
            defaultValue="SIMPLE_TEXT"
            defaultChecked={props.step?.type?.includes('SIMPLE_TEXT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Simple Text</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-1"
            name="type"
            defaultValue="NFT_CHECK"
            defaultChecked={props.step?.type?.includes('NFT_CHECK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Nft Check</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-2"
            name="type"
            defaultValue="FUNCTION_CALL"
            defaultChecked={props.step?.type?.includes('FUNCTION_CALL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Function Call</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-3"
            name="type"
            defaultValue="COMETH_API"
            defaultChecked={props.step?.type?.includes('COMETH_API')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Cometh Api</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-4"
            name="type"
            defaultValue="TOKEN_ID_RANGE"
            defaultChecked={props.step?.type?.includes('TOKEN_ID_RANGE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Token Id Range</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <div className="pt-4">
          {/* {stepType === "NFT_CHECK" && (
            <StepNftCheckForm onSave={} />
          )} */}

          {stepType === 'SIMPLE_TEXT' && <StepSimpleTextForm />}

          {stepType === 'TOKEN_ID_RANGE' && <StepTokenIdRangeForm />}

          {stepType === 'FUNCTION_CALL' && <StepFunctionCallForm />}

          {stepType === 'COMETH_API' && (
            <p>No addition info currently needed for the Cometh API check</p>
          )}
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Add Step
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default StepForm
