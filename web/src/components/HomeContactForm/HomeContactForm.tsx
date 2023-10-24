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
  Form,
  Label,
  TextField,
  FieldError,
  HiddenField,
  CheckboxField,
} from '@redwoodjs/forms'
import { LoaderIcon, toast } from '@redwoodjs/web/dist/toast'

import Fade from 'src/components/Animations/Fade'
import Button from 'src/components/Button/Button'

type FormData = {
  email: string
  honeypot?: string
  describe: Record<string, boolean>
}

// Custom StaticForms fields need to start with "$"
const checkboxOptions = [
  'describe.$player',
  'describe.$creator',
  'describe.$sponsor',
]

const HomeContactForm = forwardRef((_props, ref) => {
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxError, setCheckboxError] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null)

  const localRef = useRef<HTMLDivElement>(null)

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
    setCheckboxError(false)
    const { describe, ...rest } = data
    // Get only the selected boxes
    const submissionTypes = pickBy(describe, identity)

    // At least one checkbox needs to be selected
    if (isEmpty(submissionTypes)) {
      setCheckboxError(true)
      return
    }
    setIsLoading(true)

    const submission = {
      ...rest,
      ...submissionTypes,
      replyTo: '@',
      accessKey: process.env.STATIC_FORMS_ACCESS_TOKEN,
      subject: 'Partner Homepage Submission',
    }

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        toast.error('An error occurred while submitting the form')
        setIsSuccessful(false)
        return
      }

      const json = await res.json()

      if (json.success) {
        setIsSuccessful(true)
      } else {
        toast.error(
          json?.message || 'An error occurred while submitting the form'
        )
        setIsSuccessful(false)
      }
      setIsLoading(false)
    } catch {
      toast.error(
        'An error occurred while submitting the form. Please try again.'
      )
      setIsSuccessful(false)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoaderIcon />
  }

  if (isSuccessful) {
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
                      name={`I'm a ${name.split('describe.$')[1]}`}
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
