import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'

const UserPage = () => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <ProfileCell userId="cl9fx1rkj0017w9l6cakq27kf" />
    </>
  )
}

export default UserPage
