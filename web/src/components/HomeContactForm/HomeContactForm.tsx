import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react'

import clsx from 'clsx'
import identity from 'lodash/identity'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import {
  WaitlistFormMutation,
  WaitlistFormMutationVariables,
} from 'types/graphql'

import {
  Form,
  Label,
  TextField,
  FieldError,
  HiddenField,
  CheckboxField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { LoaderIcon, toast } from '@redwoodjs/web/dist/toast'

import Fade from 'src/components/Animations/Fade'
import Button from 'src/components/Button/Button'

type FormData = {
  email: string
  honeypot?: string
  describe: Record<string, boolean>
}

const checkboxOptions = [
  'describe.player',
  'describe.creator',
  'describe.sponsor',
]

const WAITLIST_FORM_MUTATION = gql`
  mutation WaitlistFormMutation($input: AddWaitlistFormInput!) {
    addWaitlistForm(input: $input) {
      success
    }
  }
`

const HomeContactForm = forwardRef((_props, ref) => {
  const [checkboxError, setCheckboxError] = useState(false)
  const localRef = useRef<HTMLDivElement>(null)

  const [addWaitlistForm, { loading, data }] = useMutation<
    WaitlistFormMutation,
    WaitlistFormMutationVariables
  >(WAITLIST_FORM_MUTATION, {
    onCompleted({ addWaitlistForm }) {
      if (!addWaitlistForm.success) {
        toast.error(
          'An error occurred while submitting the form. Please try again.'
        )
        return
      }
    },
    onError() {
      toast.error(
        'An error occurred while submitting the form. Please try again.'
      )
    },
  })

  const handleScroll = () => {
    if (localRef.current) {
      localRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useImperativeHandle(ref, () => ({
    scrollToElement: () => {
      handleScroll()
    },
  }))

  useEffect(() => {
    handleScroll()
  }, [])

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return

    setCheckboxError(false)

    const { describe } = data
    // Get only the selected boxes
    const submissionTypes = pickBy(describe, identity)

    // At least one checkbox needs to be selected
    if (isEmpty(submissionTypes)) {
      setCheckboxError(true)
      return
    }

    addWaitlistForm({
      variables: {
        input: {
          email: data.email,
          ...submissionTypes,
        },
      },
    })
  }

  if (loading) {
    return <LoaderIcon />
  }

  if (data?.addWaitlistForm.success) {
    return (
      <p className="mx-auto max-w-md text-center text-xl">
        Thank you! Your form has been submitted. We will get back to you as soon
        as possible.
      </p>
    )
  }

  return (
    <div className="w-full" ref={localRef}>
      <Fade>
        <Form
          onSubmit={onSubmit}
          className="mx-auto max-w-md text-sm lg:max-w-4xl"
        >
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-8">
            <HiddenField name="honeypot" />

            <div className="flex flex-col gap-4 lg:basis-1/2">
              <div>
                <Label
                  name="Email *"
                  className="label"
                  errorClassName="label error"
                  htmlFor="email"
                />
                <FieldError name="email" className="ml-2 italic text-red-400" />
              </div>
              <TextField
                name="email"
                className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
                errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
                validation={{
                  required: true,
                  pattern: {
                    message: 'Please enter a valid email',
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
                placeholder="Enter Your Email"
              />
            </div>

            <div className="flex flex-col gap-4 lg:basis-1/2">
              <p>
                What describes you best? *
                <span
                  className={clsx(
                    'ml-2 italic text-red-400',
                    checkboxError ? 'inline' : 'hidden'
                  )}
                >
                  please choose one
                </span>
              </p>
              <div className="flex flex-col gap-4 md:flex-row">
                {checkboxOptions.map((name) => (
                  <div key={name} className="">
                    <CheckboxField
                      name={name}
                      id={name}
                      className="border-1 mr-2 rounded border-white/30 bg-transparent p-3"
                    />
                    <Label
                      name={`I'm a ${name.split('describe.')[1]}`}
                      htmlFor={name}
                      className="label"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" round>
              Submit
            </Button>
          </div>
        </Form>
      </Fade>
    </div>
  )
})

export default HomeContactForm
