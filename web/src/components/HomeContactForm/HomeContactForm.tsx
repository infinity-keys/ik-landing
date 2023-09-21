import {
  Form,
  Label,
  TextField,
  TextAreaField,
  FieldError,
} from '@redwoodjs/forms'

import Button from '../Button'

const HomeContactForm = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-md flex-col gap-6 text-sm"
    >
      <div className="flex flex-col gap-4">
        <Label name="Name *" errorClassName="label error" />
        <TextField
          name="name"
          className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
          errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1"
          validation={{ required: true }}
          placeholder="Enter Your Name"
        />
        <FieldError name="name" className="text-red-300" />
      </div>

      <div className="flex flex-col gap-4">
        <Label name="Email *" className="label" errorClassName="label error" />
        <TextField
          name="email"
          className="rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50"
          errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1"
          validation={{
            required: true,
            // pattern: {
            //   value: /[^@]+@[^\.]+\..+/,
            // },
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
          errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1"
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
          errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1"
          placeholder="Enter Your Username"
        />
        <FieldError name="social" className="error-message" />
      </div>

      <div className="flex flex-col gap-4">
        <Label
          name="Tell us more about partnership opportunities"
          errorClassName="label error"
        />
        <TextAreaField
          name="message"
          className="resize-none rounded border-stone-50 bg-transparent py-1 placeholder:text-sm placeholder:text-white/50 focus:border-brand-accent-secondary focus:ring-brand-accent-secondary"
          errorClassName="border-red-500 rounded border-stone-50 bg-transparent py-1 resize-none"
          placeholder="Message"
        />
        <FieldError name="message" className="error-message" />
      </div>

      <div>
        <Button text="Submit" type="submit" variant="rounded" />
      </div>
    </Form>
  )
}

export default HomeContactForm
