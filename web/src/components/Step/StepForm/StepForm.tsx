import { useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import type { StepType, UpdateStepInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  RadioField,
  Submit,
  RWGqlError,
} from '@redwoodjs/forms'

import StepNftCheckForm from 'src/components/Step/StepForm/StepNftCheckForm'

import StepFunctionCallForm from './StepFunctionCallForm'
import StepOriumApiForm from './StepOriumApiForm'
import StepSimpleTextForm from './StepSimpleTextForm'
import StepTokenIdRangeForm from './StepTokenIdRangeForm'

interface StepFormProps {
  onSave: (data: UpdateStepInput) => void
  error?: RWGqlError
  loading?: boolean
}

function removeEmpty(obj) {
  if (typeof obj !== 'object') return obj

  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== '')
  )
}

export const stepTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'stepSimpleText',
  NFT_CHECK: 'stepNftCheck',
  FUNCTION_CALL: 'stepFunctionCall',
  COMETH_API: 'stepComethApi',
  TOKEN_ID_RANGE: 'stepTokenIdRange',
  ORIUM_API: 'stepOriumApi',
}

// this lets Richard see when & how many times the form is rendering
let renderCount = 0

// react-hook-form requires to define the type of data being submitted
type FormValues = {
  failMessage: string
  successMessage: string
  challenge: string
  resourceLinks: string
  stepSortWeight: number
  type: StepType
  stepTypeData: {
    solution: string
  }
}

const StepForm = (props: StepFormProps) => {
  const [stepType, setStepType] = useState('')
  const [nftCheckData, setNftCheckData] = useState([])

  const formMethods = useForm()

  const onSubmit = (data: FormValues) => {
    // richard put this in here to see WTF is going on
    console.log(
      'This is what the data looks like:',
      JSON.stringify(data, null, 2)
    )

    const stepTypeDataNoEmptyFields = removeEmpty(data.stepTypeData || {})

    const { requireAllNfts: _, ...rest } = stepTypeDataNoEmptyFields

    let formattedData = {
      ...data,
      stepTypeData: {
        [stepTypeLookup[data.type]]:
          data.type !== 'NFT_CHECK' ? rest : stepTypeDataNoEmptyFields,
      },
    }

    if (data.type === 'FUNCTION_CALL') {
      const methodIds = formattedData.stepTypeData.stepFunctionCall.methodIds
        .split(',')
        .map((methodId) => methodId.trim())

      formattedData = {
        ...formattedData,
        stepTypeData: {
          stepFunctionCall: {
            ...formattedData.stepTypeData.stepFunctionCall,
            methodIds,
          },
        },
      }
    }

    if (data.type === 'NFT_CHECK') {
      const formattedNftCheckData = nftCheckData.map(({ tempId: _, ...rest }) =>
        removeEmpty(rest)
      )

      const { requireAllNfts } = data.stepTypeData

      formattedData = {
        ...formattedData,
        stepTypeData: {
          stepNftCheck: {
            requireAllNfts,
            nftCheckData: {
              create: formattedNftCheckData,
            },
          },
        },
      }
    }

    props.onSave(formattedData)
    formMethods.reset()
    setStepType('')
    setNftCheckData([])
  }

  const handleSetStepType = (event) => {
    setStepType(event.target.value)
  }

  const handleSetNftCheckData = (data) => {
    const { tempId: _, ...rest } = data
    const isEmpty = Object.values(rest).every((key) => !key)
    if (isEmpty) {
      alert('NFT check data needs at least one field')
    } else {
      setNftCheckData((prevState) => [...prevState, data])
    }
  }

  const removeNftCheckData = (tempId) => {
    setNftCheckData(nftCheckData.filter((data) => data.tempId !== tempId))
  }

  // this lets Richard see when & how many times the form is rendering
  renderCount++

  return (
    <div className="rw-form-wrapper">
      <h1 className="bg-rose-200 p-2 text-2xl font-extrabold">
        Form ({renderCount})
      </h1>
      <DevTool control={formMethods.control} />
      <Form formMethods={formMethods} onSubmit={onSubmit} error={props.error}>
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
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          min={1}
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
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Token Id Range</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="step-type-5"
            name="type"
            defaultValue="ORIUM_API"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onClick={handleSetStepType}
          />
          <div>Orium Api</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <div className="pt-4">
          {stepType === 'NFT_CHECK' && (
            <div className="pt-2">
              <StepNftCheckForm handleSetNftCheckData={handleSetNftCheckData} />
              <div className="">
                {nftCheckData.map(({ tempId, ...rest }) => {
                  return (
                    <div className="mt-4 flex items-start gap-2" key={tempId}>
                      <button
                        className="block bg-red-300 px-2 py-1 leading-[1] hover:bg-red-500"
                        onClick={() => removeNftCheckData(tempId)}
                      >
                        X
                      </button>

                      <pre>{JSON.stringify(rest, null, 2)}</pre>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {stepType === 'SIMPLE_TEXT' && <StepSimpleTextForm />}

          {stepType === 'TOKEN_ID_RANGE' && <StepTokenIdRangeForm />}

          {stepType === 'FUNCTION_CALL' && <StepFunctionCallForm />}

          {stepType === 'ORIUM_API' && <StepOriumApiForm />}

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
