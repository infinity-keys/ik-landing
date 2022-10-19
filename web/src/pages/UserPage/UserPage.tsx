import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'
import Wrapper from 'src/components/Wrapper/Wrapper'

const UserPage = () => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <Wrapper>
        <ProfileCell userId="cl9fx1rkj0017w9l6cakq27kf" />
      </Wrapper>
    </>
  )
}

export default UserPage
