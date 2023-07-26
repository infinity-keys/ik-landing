import { db } from 'api/src/lib/db'

export default async () => {
  console.log('retrieving emails...')

  try {
    const emails = await db.user.findMany({
      where: {
        userRewards: { some: { nfts: { some: { tokenId: { equals: 176 } } } } },
      },
      select: {
        email: true,
      },
    })

    console.log(emails.map(({ email }) => email))
  } catch (error) {
    console.warn('retrieving emails: ')
    console.error(error)
  }
}
