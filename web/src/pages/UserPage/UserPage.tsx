import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'
import Wrapper from 'src/components/Wrapper/Wrapper'

const UserPage = () => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <Wrapper>
        <ProfileCell id="cl8ubidnr00257zl6j7quqzbx" />
      </Wrapper>
    </>
  )
}

export default UserPage
