import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import fetch from 'node-fetch'

// @TODO: use standalone creates on a loop to create user and ik org. Then loop
// all rewardables as individual creates so the deep nesting creates can happen.

// Original data
const { GRAPHQL_ENDPOINT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env
// Get all original data
const query = `query AllData {
  puzzles {
    simple_name
    migration_puzzle
    migration_step
    solution
    success_message
    fail_message
    instructions
    challenge
    list_publicly
  }
}`

export default async () => {
  try {
    const v1IkData = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    }).then((res) => res.json())

    const puzzles = v1IkData.data.puzzles.slice(0, 1)
    // const puzzles = v1IkData.data.puzzles
    console.log(JSON.stringify(puzzles, null, 2))

    type RewardableType = 'PUZZLE'
    type StepType = 'SIMPLE_TEXT'

    const rewardables = {
      create: puzzles.map((puzzle) => {
        console.log(puzzle)
        const rewardable = {
          name: puzzle.simple_name,
          slug: puzzle.simple_name,
          type: 'PUZZLE' as RewardableType,
          explanation: puzzle.instructions,
          successMessage: puzzle.success_message, // just dupe what's in step for now
          puzzle: {
            create: {
              steps: {
                create: [
                  {
                    failMessage: puzzle.fail_message,
                    challenge: puzzle.challenge,
                    successMessage: puzzle.success_message,
                    type: 'SIMPLE_TEXT' as StepType,
                    stepSimpleText: {
                      create: {
                        solution: puzzle.solution,
                      },
                    },
                  },
                ],
              },
            },
          },
        }

        return rewardable
      }),
    }

    console.log(JSON.stringify(rewardables, null, 2))

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

    const ikCuid = 'cla9yay7y003k08la2z4j2xrv'

    const ikData: Prisma.UserCreateArgs['data'][] = [
      {
        username: 'Herp',
        organizations: {
          create: [
            {
              organization: {
                create: {
                  id: ikCuid,
                  name: 'Infinity Keys',
                  slug: 'ik',
                  // rewardables,
                  // rewardables: {
                  //   create: [
                  //     {
                  //       name: 'Not Right',
                  //       slug: 'notright',
                  //       type: 'PUZZLE',
                  //       explanation: 'This is a starter puzzle',
                  //       puzzle: {
                  //         create: {
                  //           steps: {
                  //             create: [
                  //               {
                  //                 failMessage: 'You failed',
                  //                 successMessage: 'You did it!',
                  //                 challenge: 'Derp challenge',
                  //                 type: 'SIMPLE_TEXT',
                  //                 stepSimpleText: {
                  //                   create: {
                  //                     solution: 'wrong',
                  //                   },
                  //                 },
                  //               },
                  //             ],
                  //           },
                  //         },
                  //       },
                  //     },
                  //   ],
                  // },
                },
              },
            },
          ],
        },
        // organizations: {
        //   create: [
        //     {
        //       orgId: ikCuid,
        //       organization: {
        //         create: {
        //           // id: 'cla98s0cm000008mh66occsh4', // Keep this stable
        //           id: ikCuid,
        //           name: 'Infinity Keys',
        //           slug: 'ik',
        //           rewardables: {
        //             create: [
        //               {
        //                 name: 'Not Right',
        //                 slug: 'notright',
        //                 type: 'PUZZLE',
        //                 puzzle: {
        //                   create: {
        //                     steps: {
        //                       create: [
        //                         {
        //                           failMessage: 'You failed',
        //                           successMessage: 'You did it!',
        //                           challenge: 'Derp challenge',
        //                           type: 'SIMPLE_TEXT',
        //                           stepSimpleText: {
        //                             create: {
        //                               solution: 'wrong',
        //                             },
        //                           },
        //                         },
        //                       ],
        //                     },
        //                   },
        //                 },
        //               },
        //             ],
        //           },
        //         },
        //       },
        //     },
        //   ],
        // },
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
