import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import Wrapper from 'src/components/Wrapper/Wrapper'
import Logo from 'src/svgs/Logo'

const DeletePage = ({ jwt }) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleClick = async (jwt: string) => {
    console.log('jwt: ', jwt)
    // try {
    //   const res = await deleteUser(jwt)
    //   if (!res.ok) {
    //     throw Error
    //   }
    //   setIsError(false)
    //   setSuccessMessage('Your info has been deleted. Thank you for playing!')
    // } catch (e) {
    //   setIsError(true)
    //   setSuccessMessage('')
    // }
  }

  return (
    <Wrapper>
      <Seo title="Delete My Data" />

      <div className="max-w-2xl text-center">
        <Link to={routes.home()} className="flex justify-center">
          <Logo />
        </Link>

        {successMessage && (
          <>
            <div className="mb-4">
              <Text>{successMessage}</Text>
            </div>
            <Button to={routes.home()} text="Return Home" />
          </>
        )}

        {!successMessage && (
          <>
            <div className="mt-7">
              <Heading>Delete My Data</Heading>
            </div>
            <Text>
              This will remove you from the database completely. All progress
              related to your completed puzzles and NFTs will be lost.
            </Text>
            <div className="mt-7">
              <Button
                onClick={() => handleClick(jwt)}
                text="Delete My Data"
                variant="warn"
              />
            </div>
          </>
        )}

        {isError && (
          <div className="mt-4 flex justify-center">
            <Alert text="Something went wrong with your request. If this keeps happening, please contact us on our [Discord channel](https://discord.com/invite/infinitykeys)" />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default DeletePage
