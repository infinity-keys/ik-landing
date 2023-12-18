import { PropsWithChildren } from 'react'

const SectionContainer = ({
  pageHeading,
  children,
}: {
  pageHeading: string
} & PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-lg md:max-w-5xl md:px-4">
      <h1 className="mb-14 hidden text-3xl font-semibold md:block">
        {pageHeading}
      </h1>
      <div className="flex flex-col justify-center pb-8 md:flex-row md:gap-6">
        {children}
      </div>
    </div>
  )
}

export default SectionContainer
