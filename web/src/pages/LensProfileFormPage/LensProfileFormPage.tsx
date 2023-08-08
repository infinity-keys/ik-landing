import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'

import Seo from 'src/components/Seo/Seo'

const LensProfileFormPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <>
      <Seo title="LensProfileForm" />

      <div>
        <h1 className="mb-8 text-3xl font-bold text-white">
          Get Your Lens Profile
        </h1>
        <Form onSubmit={onSubmit} className="flex max-w-lg flex-col">
          <div className="flex gap-2">
            <div className="relative mb-4 flex flex-1 flex-col pb-7">
              <Label
                name="First Name"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                name="First Name"
                className="rounded border-white bg-transparent"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{ required: true }}
              />
              <FieldError
                name="First Name"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>

            <div className="relative mb-4 flex flex-1 flex-col pb-7">
              <Label
                name="Last Name"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                name="Last Name"
                className="rounded border-white bg-transparent"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{ required: true }}
              />
              <FieldError
                name="Last Name"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>
          </div>

          <div className="relative mb-4 flex flex-col pb-7">
            <Label
              name="Lens Address"
              className="mb-1 text-sm"
              errorClassName="mb-1 text-sm"
            />
            <TextField
              name="Lens Address"
              className="rounded border-white bg-transparent placeholder:text-gray-200"
              errorClassName="rounded border-red-400 bg-transparent"
              validation={{ required: true }}
              placeholder="0x123..."
            />
            <FieldError
              name="Lens Address"
              className="absolute left-0 bottom-0 text-sm italic text-gray-150"
            />
          </div>

          <div className="relative mb-3 flex flex-col pb-7">
            <Label
              name="Link to Social Media Account (optional)"
              className="mb-1 text-sm"
              errorClassName="mb-1 text-sm"
            />
            <TextField
              name="Social Account One"
              className="rounded border-white bg-transparent placeholder:text-gray-200"
              errorClassName="rounded border-red-400 bg-transparent"
            />
            <FieldError
              name="Social Account One"
              className="absolute left-0 bottom-0 text-sm italic text-gray-150"
            />
          </div>

          <div className="relative mb-3 flex flex-col pb-7">
            <Label
              name="Link to Another Social Media Account (optional)"
              className="mb-1 text-sm"
              errorClassName="mb-1 text-sm"
            />
            <TextField
              name="Social Account Two"
              className="rounded border-white bg-transparent placeholder:text-gray-200"
              errorClassName="rounded border-red-400 bg-transparent"
            />
            <FieldError
              name="Social Account Two"
              className="absolute left-0 bottom-0 text-sm italic text-gray-150"
            />
          </div>

          <Submit className="rounded bg-brand-accent-primary py-2 text-white transition-colors hover:bg-brand-accent-secondary">
            Submit
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default LensProfileFormPage
