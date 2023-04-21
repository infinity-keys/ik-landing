import { MetaTags } from '@redwoodjs/web'

const UnderConstructionPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <MetaTags
        title="UnderConstruction"
        description="UnderConstruction page"
      />

      <h1 className="mb-2 text-4xl font-bold">Under Construction</h1>
      <p>We will be back shortly. Thank you for your patience.</p>
    </div>
  )
}

export default UnderConstructionPage
