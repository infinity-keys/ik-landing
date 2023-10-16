import { useEffect, useState } from 'react'

import {
  Form,
  Label,
  TextField,
  TextAreaField,
  FieldError,
  HiddenField,
} from '@redwoodjs/forms'
import { LoaderIcon, toast } from '@redwoodjs/web/dist/toast'

import Fade from '../Animations/Fade'
import Button from '../Button'

type FormData = {
  name: string
  email: string
  website?: string
  social?: string
  honeypot?: string
  message?: string
}

const HomeContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null)

  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    const submission = {
      ...data,
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
    <div className="w-full" ref={ref}>
      <Fade>
        <Form
          onSubmit={onSubmit}
          className="mx-auto flex w-full max-w-md flex-col gap-6 text-sm md:grid md:max-w-none md:grid-cols-2"
        >
          <HiddenField name="honeypot" />

          <div className="flex flex-col gap-4 lg:basis-1/2">
            <Label name="Name *" errorClassName="label error" />
            <TextField
              name="name"
              className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              validation={{ required: true }}
              placeholder="Enter Your Name"
            />
            <FieldError name="name" className="text-red-300" />
          </div>

          <div className="flex flex-col gap-4 lg:basis-1/2">
            <Label
              name="Email *"
              className="label"
              errorClassName="label error"
            />
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
            <FieldError name="email" className="error-message" />
          </div>

          <div className="flex flex-col gap-4">
            <Label name="Company Website" errorClassName="label error" />
            <TextField
              name="website"
              className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              placeholder="www.yourwebsite.com"
            />
            <FieldError name="website" className="error-message" />
          </div>

          <div className="flex flex-col gap-4">
            <Label
              name="Discord/Telegram/Linkedin"
              errorClassName="label error"
              placeholder="Enter Your Email"
            />
            <TextField
              name="social"
              className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
              placeholder="Enter Your Username"
            />
            <FieldError name="social" className="error-message" />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <Label
              name="Tell us more about partnership opportunities"
              errorClassName="label error"
            />
            <TextAreaField
              name="message"
              className="resize-none rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50 focus:border-brand-accent-secondary focus:ring-brand-accent-secondary"
              errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 resize-none placeholder:text-sm placeholder:text-white/50"
              placeholder="Message"
            />
            <FieldError name="message" className="error-message" />
          </div>

          <div>
            <Button type="submit" variant="rounded">
              Submit
            </Button>
          </div>
        </Form>
      </Fade>
    </div>
  )
}

export default HomeContactForm
