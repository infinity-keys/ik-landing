import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // const orgs: Prisma.OrganizationCreateArgs['data'][] = [
    //   { id: 'cla98s0cm000008mh66occsh4', name: 'Infinity Keys', slug: 'ik' },
    // ]
    // const createdOrgs = await Promise.all(
    //   orgs.map(async (org) => {
    //     const record = await db.organization.create({ data: org })
    //     console.log(record)
    //   })
    // )
    // console.log(createdOrgs)

    const ikData: Prisma.UserCreateArgs['data'][] = [
      {
        username: 'Herp',
        organizations: {
          create: [
            {
              organization: {
                create: {
                  id: 'cla98s0cm000008mh66occsh4', // Keep this stable
                  name: 'Infinity Keys',
                  slug: 'ik',
                  rewardables: {
                    create: [
                      {
                        name: 'Not Right',
                        slug: 'notright',
                        type: 'PUZZLE',
                        puzzle: {
                          create: {
                            steps: {
                              create: [
                                {
                                  failMessage: 'You failed',
                                  successMessage: 'You did it!',
                                  instructions: 'Do this.',
                                  challenge: 'Derp challenge',
                                  type: 'SIMPLE_TEXT',
                                  stepSimpleText: {
                                    create: {
                                      solution: 'wrong',
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      // { name: 'alice', email: 'alice@example.com' },
      // { name: 'mark', email: 'mark@example.com' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    ]

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      ikData.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
