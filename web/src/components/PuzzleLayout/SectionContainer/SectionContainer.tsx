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
      <div className="grid grid-cols-1 pb-8 md:grid-cols-2 md:items-stretch md:gap-6">
        {children}
      </div>
    </div>
  )
}

export default SectionContainer
