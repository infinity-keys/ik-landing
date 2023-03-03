import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'

const UserPage = () => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <ProfileCell />
    </>
  )
}

export default UserPage
