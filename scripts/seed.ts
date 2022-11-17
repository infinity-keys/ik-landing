import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import type { RewardableType, StepType } from 'api/types/graphql'
import { groupBy } from 'lodash'
import fetch from 'node-fetch'
import { z } from 'zod'

// @TODO: use standalone creates on a loop to create user and ik org. Then loop
// all rewardables as individual creates so the deep nesting creates can happen.

// Original data
const { GRAPHQL_ENDPOINT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env

// Get all original data
const query = `query AllData {
  puzzles {
    simple_name
    solution
    success_message
    fail_message
    instructions
    challenge
    list_publicly
    migration_puzzle
    migration_step
  }
}`

const ApiPuzzle = z.object({
  simple_name: z.string(),
  solution: z.string(),
  success_message: z.nullable(z.string()),
  fail_message: z.nullable(z.string()),
  instructions: z.nullable(z.string()),
  challenge: z.nullable(z.string()),
  list_publicly: z.boolean(),
  migration_puzzle: z.nullable(z.string()),
  migration_step: z.nullable(z.string()),
})

const ApiResponse = z.object({
  data: z.object({
    puzzles: z.array(ApiPuzzle),
  }),
})

// Stable IK org ID
const ikCuid = 'cla9yay7y003k08la2z4j2xrv'

export default async () => {
  try {
    // Fetch all data we need to migrate
    const apiRaw = await fetch(GRAPHQL_ENDPOINT, {
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
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    const userOrg: Prisma.UserCreateArgs['data'][] = [
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
                },
              },
            },
          ],
        },
      },
    ]

    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    await Promise.all(
      userOrg.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )

    // Rewardables/Puzzles

    // Validate and type incoming data
    const puzzles = ApiResponse.parse(apiRaw).data.puzzles

    // Group by the named puzzle flagged in migration column
    const migratePuzzles: Prisma.RewardableCreateArgs['data'][] =
      Object.entries(groupBy(puzzles, 'migration_puzzle')).reduce(
        (acc, curr) => {
          const [puzzleGroup, puzzles] = curr

          // Puzzles that DO NOT need to be combined
          if (puzzleGroup === 'null') {
            const rewardables = puzzles.map((puzzle) => ({
              name: puzzle.simple_name,
              slug: puzzle.simple_name,
              type: 'PUZZLE' as RewardableType,
              explanation: puzzle.instructions || '',
              successMessage: puzzle.success_message, // just dupe what's in step for now
              organization: {
                connect: {
                  id: ikCuid,
                },
              },
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
            }))
            acc = [...acc, ...rewardables]
            return acc
          }

          // These are puzzles that are being combined into multi-step in new system
          const rewardable = {
            name: puzzleGroup,
            slug: puzzleGroup,
            type: 'PUZZLE' as RewardableType,
            explanation: puzzles[0].instructions,
            // just dupe what's in step 1 for now
            successMessage: puzzles[puzzles.length - 1].success_message,
            organization: {
              connect: {
                id: ikCuid,
              },
            },
            puzzle: {
              create: {
                steps: {
                  create: puzzles.map((puzzle) => ({
                    failMessage: puzzle.fail_message,
                    challenge: puzzle.challenge,
                    successMessage: puzzle.success_message,
                    type: 'SIMPLE_TEXT' as StepType,
                    stepSortWeight: parseInt(puzzle.migration_step, 10),
                    stepSimpleText: {
                      create: {
                        solution: puzzle.solution,
                      },
                    },
                  })),
                },
              },
            },
          }
          acc = [...acc, rewardable]
          return acc
        },
        [] as Prisma.RewardableCreateArgs['data'][]
      )

    // console.log(migratePuzzles)

    await Promise.all(
      migratePuzzles.map(async (data) => {
        const record = await db.rewardable.create({ data })
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
