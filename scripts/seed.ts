import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import type { RewardableType, StepType } from 'api/types/graphql'
import { groupBy } from 'lodash'
import fetch from 'node-fetch'
import { z } from 'zod'

import MigrateNfts from './migrateNftMetadata'

// @TODO: use standalone creates on a loop to create user and ik org. Then loop
// all rewardables as individual creates so the deep nesting creates can happen.

// Original data
const { GRAPHQL_ENDPOINT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env

// Get all original data
const query = `query AllData {
  puzzles {
    puzzle_id
    simple_name
    landing_route
    solution
    success_message
    fail_message
    instructions
    challenge
    list_publicly
    migration_puzzle
    migration_step
    nft_check_parameters
    nft {
      tokenId
    }
  }

  packs {
    pack_id
    pack_name
    simple_name
    pack_puzzles {
      puzzle {
        sort_weight
        puzzle_id
        migration_puzzle
      }
    }
    nftId
    cloudinary_id
    list_publicly
  }
}`

const ApiPuzzle = z.object({
  puzzle_id: z.string(),
  simple_name: z.string(),
  landing_route: z.string(),
  solution: z.string(),
  success_message: z.nullable(z.string()),
  fail_message: z.nullable(z.string()),
  instructions: z.nullable(z.string()),
  challenge: z.nullable(z.string()),
  list_publicly: z.boolean(),
  migration_puzzle: z.nullable(z.string()),
  migration_step: z.nullable(z.string()),
  nft_check_parameters: z.nullable(
    z
      .object({
        nftChainId: z.string().or(z.number()),
        nftTokenId: z.string(),
        nftContractAddress: z.string(),
      })
      .partial()
  ),
  nft: z.nullable(
    z.object({
      tokenId: z.number(),
    })
  ),
})

const ApiPack = z.object({
  pack_id: z.string(),
  pack_name: z.string(),
  simple_name: z.string(),
  pack_puzzles: z.array(
    z.object({
      puzzle: z.object({
        sort_weight: z.number(),
        puzzle_id: z.string(),
        migration_puzzle: z.nullable(z.string()),
      }),
    })
  ),
  nftId: z.number(),
  cloudinary_id: z.string().nullable(),
  list_publicly: z.boolean(),
})

const ApiResponse = z.object({
  data: z.object({
    puzzles: z.array(ApiPuzzle),
    packs: z.array(ApiPack),
  }),
})

// Stable IK org ID
const ikCuid = 'cla9yay7y003k08la2z4j2xrv'

const createNftConnectionObject = (nfts, nftId) => {
  const nft = nfts.find(({ tokenId }) => tokenId === nftId)
  return nft
    ? {
        nfts: {
          connect: {
            id: nft?.id,
          },
        },
      }
    : {}
}

const createConditionalStepData = (puzzle) => {
  const nftCheckData = puzzle.nft_check_parameters

  const getNumber = (data) => {
    if (typeof data === 'number') return data
    if (typeof data === 'string') return parseInt(data, 10)
    return null
  }

  return nftCheckData
    ? {
        type: 'NFT_CHECK' as StepType,
        stepNftCheck: {
          create: {
            nftCheckData: {
              create: [
                {
                  contractAddress: nftCheckData.nftContractAddress,
                  chainId: getNumber(nftCheckData.nftChainId),
                  tokenId: getNumber(nftCheckData.nftTokenId),
                  poapEventId: null,
                },
              ],
            },
          },
        },
      }
    : {
        type: 'SIMPLE_TEXT' as StepType,
        stepSimpleText: {
          create: {
            solution: puzzle.solution,
          },
        },
      }
}

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
        username: 'Infinity Keys User',
        authId: 'did:ethr:0xf19621f2Fb459B9954170bf5F2F7b15A2aA1E3f9',
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
        return await db.user.create({ data })
      })
    )

    // NFTs
    const nfts = await MigrateNfts()
    console.log(`created ${nfts.length} new NFTs`)

    // Validate and type incoming data
    const typedApiResponse = ApiResponse.parse(apiRaw)

    // Rewardables/Puzzles

    // Pull off just puzzles from typed incoming data
    const puzzles = typedApiResponse.data.puzzles

    // Rewardables/Puzzles

    // Pull off just packs from typed incoming data
    const packs = typedApiResponse.data.packs

    const migratePacks = packs.map((pack) => {
      const rewardable = {
        migrateId: pack.pack_id,
        name: pack.pack_name,
        slug: pack.simple_name,
        type: 'PACK' as RewardableType,
        explanation: pack.pack_name,
        successMessage: 'Success!',
        listPublicly: pack.list_publicly,
        organization: {
          connect: {
            id: ikCuid,
          },
        },
        pack: {
          create: {},
        },
      }

      return { ...rewardable, ...createNftConnectionObject(nfts, pack.nftId) }
    })

    // Group by the named puzzle flagged in migration column
    const migratePuzzles: Prisma.RewardableCreateArgs['data'][] =
      Object.entries(groupBy(puzzles, 'migration_puzzle')).reduce(
        (acc, curr) => {
          const [puzzleGroup, puzzles] = curr

          // Puzzles that DO NOT need to be combined
          if (puzzleGroup === 'null') {
            const rewardables = puzzles.map((puzzle) => {
              const rewardable = {
                migrateId: puzzle.puzzle_id,
                name: puzzle.simple_name,
                slug: puzzle.landing_route,
                type: 'PUZZLE' as RewardableType,
                explanation: puzzle.instructions || '',
                successMessage: puzzle.success_message, // just dupe what's in step for now
                listPublicly: puzzle.list_publicly,
                organization: {
                  connect: {
                    id: ikCuid,
                  },
                },
                puzzle: {
                  create: {
                    isAnon:
                      puzzle.landing_route === 'notright' ||
                      puzzle.landing_route === 'thesis' ||
                      puzzle.landing_route === 'communitycode',
                    steps: {
                      create: [
                        {
                          failMessage: puzzle.fail_message,
                          challenge: puzzle.challenge,
                          successMessage: puzzle.success_message,
                          migrateLandingRoute: puzzle.landing_route,
                          ...createConditionalStepData(puzzle),
                        },
                      ],
                    },
                  },
                },
              }

              return {
                ...rewardable,
                ...createNftConnectionObject(nfts, puzzle.nft?.tokenId),
              }
            })
            acc = [...acc, ...rewardables]
            return acc
          }

          // Since we removed NFTs from all multi-step puzzles EXCEPT the final puzzle
          // (due to hax), we need to get the last puzzle to determine the NFT associated
          // with the overall multi-step series of puzzles.
          const lastPuzzle = puzzles
            .sort(
              (a, b) =>
                parseInt(a.migration_step, 10) - parseInt(b.migration_step, 10)
            )
            .at(-1)

          // These are puzzles that are being combined into multi-step in new system
          const rewardable = {
            migrateId: puzzles[0].puzzle_id,
            name: puzzleGroup,
            slug: puzzleGroup,
            type: 'PUZZLE' as RewardableType,
            explanation: puzzles[0].instructions || '',
            // just dupe what's in step 1 for now
            successMessage: lastPuzzle.success_message,
            listPublicly: puzzles[0].list_publicly,
            organization: {
              connect: {
                id: ikCuid,
              },
            },
            puzzle: {
              create: {
                isAnon: puzzleGroup === 'firstgate',
                steps: {
                  create: puzzles.map((puzzle) => ({
                    failMessage: puzzle.fail_message,
                    challenge: puzzle.instructions,
                    successMessage: puzzle.success_message,
                    migrateLandingRoute: puzzle.landing_route,
                    stepSortWeight: parseInt(puzzle.migration_step, 10),
                    ...createConditionalStepData(puzzle),
                  })),
                },
              },
            },
          }

          acc = [
            ...acc,
            {
              ...rewardable,
              ...createNftConnectionObject(nfts, lastPuzzle.nft?.tokenId),
            },
          ]
          return acc
        },
        [] as Prisma.RewardableCreateArgs['data'][]
      )

    const newPuzzles = await Promise.all(
      migratePuzzles.map(async (data) => {
        return await db.rewardable.create({ data })
      })
    )

    console.log(`created ${newPuzzles.length} new puzzles`)

    const newPacks = await Promise.all(
      migratePacks.map(async (data) => {
        return await db.rewardable.create({ data })
      })
    )

    console.log(`created ${newPacks.length} new packs`)

    const puzzlesOnPacks = newPacks.flatMap((newPack) => {
      // for each new pack, find its associated old pack and get its puzzles
      const oldPuzzles = packs.find(
        ({ pack_id }) => pack_id === newPack.migrateId
      ).pack_puzzles

      // for each old puzzle, find its new puzzle and create a connection
      return oldPuzzles.map(({ puzzle }) => {
        const newPuzzle = puzzle.migration_puzzle
          ? newPuzzles.find(({ slug }) => slug === puzzle.migration_puzzle)
          : newPuzzles.find(({ migrateId }) => migrateId === puzzle.puzzle_id)
        return {
          parentId: newPack.id,
          childId: newPuzzle.id,
          childSortWeight: puzzle.sort_weight,
        }
      })
    })

    const newRewardableConnections = await Promise.all(
      puzzlesOnPacks.map(async (data) => {
        return await db.rewardableConnection.create({ data })
      })
    )

    console.log(
      `created ${newRewardableConnections.length} new rewardable connections`
    )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:

    //   import { hashPassword } from '@redwoodjs/api'

    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]

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
