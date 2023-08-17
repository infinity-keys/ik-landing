import {
  ANONYMOUS_USER_ID,
  IK_CLAIMS_NAMESPACE,
  PAGINATION_COUNTS,
  PUZZLE_COOKIE_NAME,
} from '@infinity-keys/constants'
import { IK_ID_COOKIE } from '@infinity-keys/constants'
import { IkJwt } from '@infinity-keys/core'
import cookie from 'cookie'
import type { QueryResolvers, MutationResolvers, StepType } from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { PuzzlesData } from 'src/lib/cookie'
import { db } from 'src/lib/db'
import { decryptAndDecompressText } from 'src/lib/encoding/encoding'
import { verifyToken } from 'src/lib/jwt'
import { logger } from 'src/lib/logger'
// import { createRewardable } from 'src/services/rewardables/rewardables'

import anonPuzzles from '../../../../anonPuzzleData.json'

import supersecretRoutes from './supersecretRoutes'

export const rewardableBySlug: QueryResolvers['rewardableBySlug'] = ({
  slug,
  type,
}) => {
  return db.rewardable.findUnique({
    where: {
      slug_type: {
        slug,
        type,
      },
    },
  })
}

export const rewardablesBySortType: QueryResolvers['rewardablesBySortType'] = ({
  sortType,
}) => {
  if (!sortType) return []
  return db.rewardable.findMany({
    where: {
      sortType,
      listPublicly: true,
    },
  })
}

export const rewardableBySlugWithAnonPuzzle: QueryResolvers['rewardableBySlugWithAnonPuzzle'] =
  async ({ slug }) => {
    return db.rewardable.findFirstOrThrow({
      where: {
        slug,
        type: 'PUZZLE',
        puzzle: {
          isAnon: true,
        },
      },
    })
  }

export const rewardablesCollection: QueryResolvers['rewardablesCollection'] =
  async ({ types, page = 1, count = 16 }) => {
    if (!page || !count) {
      throw new Error('Missing pagination info')
    }

    const skip = (page - 1) * count
    const [smallestPaginationCount] = PAGINATION_COUNTS
    const take = PAGINATION_COUNTS.includes(count)
      ? count
      : smallestPaginationCount

    const typesFilter = types.map((type) => ({ type, listPublicly: true }))
    const totalCount = await db.rewardable.count({
      where: { OR: typesFilter },
    })

    // Signals to Redwood to render the `Empty` component
    if (totalCount === 0) return null

    return {
      rewardables: await db.rewardable.findMany({
        where: { OR: typesFilter },
        take,
        skip,
        orderBy: { sortWeight: 'asc' },
      }),
      totalCount,
    }
  }

// @TODO: what is this return type?
export const rewardableClaim = ({ id }: { id: string }) => {
  if (!context?.currentUser?.id) {
    throw new Error('Not logged in')
  }
  return db.rewardable.findUnique({
    where: { id },
    select: {
      type: true,
      nfts: {
        select: {
          id: true,
          tokenId: true,
        },
      },
      userRewards: {
        where: { userId: context.currentUser.id },
        select: {
          id: true,
          nfts: {
            select: {
              id: true,
            },
          },
        },
      },
      asParent: {
        select: {
          childRewardable: {
            select: {
              userRewards: {
                where: { userId: context.currentUser.id },
                select: {
                  id: true,
                },
              },
              nfts: {
                select: {
                  tokenId: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

/**
 * Reads both:
 *  1. The old v1 ik-id cookie
 *  2. The new v2 ik-puzzles cookie
 *
 * In the v1 cookie, it finds old puzzle progress and converts it to v2 Step
 * progress. In the v2 cookie, it finds ANONYMOUS Puzzles (Puzzles that do not
 * require a user to be logged in) and converts them to Steps.
 */
export const reconcileProgress: MutationResolvers['reconcileProgress'] =
  async () => {
    logger.info('Reconciling progress', { context })

    /**
     * Convert v1 Puzzles to v2 Steps
     */
    const reconcileV1PuzzlesToV2Steps = async (ikV1Cookie: string) => {
      if (!context?.currentUser?.id) {
        logger.error('No user logged in, cannot reconcile progress')
        return
      }
      logger.info(`User ${context.currentUser.id} has ikV1 cookie, reconciling`)
      // Parse and verify the old JWT to figure out what (old) puzzles a user solved
      const verifiedIkV1Jwt = await verifyToken(ikV1Cookie)
      const payload = verifiedIkV1Jwt.payload as unknown as IkJwt
      const oldPuzzleNames = payload.claims[IK_CLAIMS_NAMESPACE].puzzles || []

      // some landing routes were changed to be hidden from people (bots) from
      // targeting them directly. Users who had solved the puzzles before that
      // point have the old url (without supersecret prefix). This is to ensure
      // users get credit for having solved supersecret puzzles before the urls
      // were hidden
      const puzzlesToCheck = oldPuzzleNames.map((puzzleName) =>
        supersecretRoutes.includes(`supersecret-${puzzleName}`)
          ? `supersecret-${puzzleName}`
          : puzzleName
      )

      // Now, loop through old puzzles, and write to DB that user has solved them
      // in the v2 equivalent. Puzzles in v1 are Steps in v2.

      // 1. Cookies may contain urls that were changed or deleted and were not
      // brought over in the migration. This gets landing routes that exist
      // in the current db based on routes in the user's cookie
      const goodStepsInRedwoodDb = await db.step.findMany({
        select: {
          id: true,
          migrateLandingRoute: true,
        },
        where: {
          migrateLandingRoute: {
            in: puzzlesToCheck,
          },
        },
      })

      // 2. Get a user's solved steps
      const userProgress = await db.user.findUnique({
        where: { id: context.currentUser.id },
        select: {
          attempts: {
            where: {
              solve: {
                isNot: null,
              },
            },
            select: {
              id: true,
              step: {
                select: {
                  id: true,
                  migrateLandingRoute: true,
                },
              },
            },
          },
        },
      })

      // 3. Get all the routes they've already solved
      const migrateRoutesCompleted = userProgress.attempts.map(
        (attempt) => attempt.step.migrateLandingRoute
      )

      // 4. Check all the routes that are in the cookie and exist in the DB
      // Filter out the ones that are already solved
      const filteredRoutes = goodStepsInRedwoodDb
        .filter(
          (goodRoute) =>
            !migrateRoutesCompleted.includes(goodRoute.migrateLandingRoute)
        )
        .map(({ migrateLandingRoute }) => migrateLandingRoute)

      // 5. Create new Attempts + Solves for each of the old puzzles that we
      // haven't solved yet
      const newSolves = filteredRoutes.map((puzzlePath) => {
        if (!context?.currentUser?.id) {
          throw new Error('Not logged in')
        }
        if (!puzzlePath) {
          throw new Error('No puzzle path')
        }
        return db.solve.create({
          data: {
            user: {
              connect: {
                id: context.currentUser.id,
              },
            },
            attempt: {
              create: {
                data: {
                  v1Reconciliation: true,
                },
                user: {
                  connect: {
                    id: context.currentUser.id,
                  },
                },
                step: {
                  connect: {
                    migrateLandingRoute: puzzlePath,
                  },
                },
              },
            },
          },
        })
      })

      // 6. Fire off all the Solve + Attempt creations. Some people solve a lot
      // of puzzles and that crashes when using Promise.all()
      for (const solve of newSolves) {
        await solve
      }

      /**
       * Create userRewards for puzzles and packs solved in the v1
       */

      // Get all rewardables without a userReward whose puzzle's steps are in
      // the v1 cookie
      const puzzlesWithoutRewards = await db.rewardable.findMany({
        where: {
          puzzle: {
            steps: {
              some: {
                migrateLandingRoute: {
                  in: goodStepsInRedwoodDb.map(
                    ({ migrateLandingRoute }) => migrateLandingRoute
                  ),
                },
                attempts: {
                  some: {
                    solve: {
                      isNot: null,
                    },
                  },
                },
              },
            },
          },
          NOT: {
            userRewards: {
              some: {
                userId: context.currentUser.id,
              },
            },
          },
        },
        include: {
          asChild: true,
          puzzle: {
            include: {
              steps: {
                include: {
                  attempts: {
                    include: {
                      solve: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (puzzlesWithoutRewards.length) {
        // Get rewardables that have solves on every step
        const solvedPuzzles = puzzlesWithoutRewards.filter(({ puzzle }) =>
          puzzle.steps.every(({ attempts }) =>
            attempts.some(({ solve }) => !!solve?.id)
          )
        )

        // Create user rewards for solved puzzles
        const puzzleUserRewards = solvedPuzzles.map(({ id }) => ({
          rewardableId: id,
          userId: context.currentUser.id,
        }))

        await db.userReward.createMany({
          data: puzzleUserRewards,
          skipDuplicates: true,
        })

        // Get pack ids for solved puzzles
        const parentIds = new Set(
          solvedPuzzles.flatMap(({ asChild }) =>
            asChild.map(({ parentId }) => parentId)
          )
        )

        // Get pack rewardables
        const packRewardables = await db.rewardable.findMany({
          where: {
            id: {
              in: Array.from(parentIds),
            },
            type: 'PACK',
          },
          select: {
            id: true,
            asParent: {
              select: {
                childRewardable: {
                  select: {
                    userRewards: {
                      where: { userId: context.currentUser.id },
                    },
                  },
                },
              },
            },
          },
        })

        // Get pack rewardable ids for packs without userRewards
        const unrewardedPackRewardables = packRewardables
          .filter(({ asParent }) =>
            asParent.every(
              ({ childRewardable }) => childRewardable.userRewards.length
            )
          )
          .map(({ id }) => id)

        // Create userRewards for solved packs
        const packUserRewards = unrewardedPackRewardables.map((id) => ({
          rewardableId: id,
          userId: context.currentUser.id,
        }))

        await db.userReward.createMany({
          data: packUserRewards,
          skipDuplicates: true,
        })
      }
    }

    /**
     * Convert anonymous Rewardables to signed-in user progress cookie
     * NOTE: Step IDs are reset during `migrate reset`, so we won't always have
     * IDs from the cookie in the DB. Catch and log.
     */
    const reconcileCookieRewardables = async (ikV2Cookie: string) => {
      if (!context?.currentUser?.id) {
        throw new Error('Not logged in')
      }
      // Parse ik-puzzles cookie
      const v2CookieClearText = decryptAndDecompressText(ikV2Cookie)
      const parsedIkV2Cookie = PuzzlesData.parse(JSON.parse(v2CookieClearText))

      if (
        parsedIkV2Cookie.authId !== context.currentUser.authId &&
        parsedIkV2Cookie.authId !== ANONYMOUS_USER_ID
      ) {
        return logger.warn(
          `User ${context.currentUser.id} has ikV2 cookie, but authId does not match`
        )
      }

      // Just loop through all records in the cookie and see if any are missing in db
      const cookieSolvedSteps = Object.entries(
        parsedIkV2Cookie.puzzles
      ).flatMap(([, stepData]) => stepData.steps)

      // Does the user's cookie steps actually exist in the DB?
      const stepsExist = await db.step.findMany({
        select: { id: true },
        where: {
          id: {
            in: cookieSolvedSteps,
          },
        },
      })

      // Whoops, they have old steps from prior migration reset
      if (!stepsExist.length) {
        logger.info('User cookie has steps from prior migration reset', {
          context,
          cookieSolvedSteps,
        })
        return
      }

      const existingUserSolves = await db.step.findMany({
        select: { id: true },
        where: {
          id: {
            in: stepsExist.map(({ id }) => id),
          },
          attempts: {
            some: {
              userId: context.currentUser.id,
              solve: {
                userId: context.currentUser.id,
              },
            },
          },
        },
      })

      // Steps we have NOT solved in db vs what exists in cookie
      const stepsUnsolvedInDb = stepsExist.filter((step) => {
        return !existingUserSolves.find(({ id }) => id === step.id)
      })

      // Add to db any that are missing
      const newSolves = stepsUnsolvedInDb.map((step) => {
        if (!context?.currentUser?.id) {
          throw new Error('No current user')
        }
        return db.solve.create({
          data: {
            user: {
              connect: {
                id: context.currentUser.id,
              },
            },
            attempt: {
              create: {
                data: {
                  // v2Reconciliation here means "cookie had info we didn't yet have in db"
                  v2Reconciliation: true,
                },
                user: {
                  connect: {
                    id: context.currentUser.id,
                  },
                },
                step: {
                  connect: {
                    id: step.id,
                  },
                },
              },
            },
          },
        })
      })

      // Do it
      await Promise.all(newSolves)

      /**
       * Create userRewards for puzzles solved anonymously and for packs where
       * solving an anonymous puzzle results in a solved pack
       */

      // Get all puzzle ids off cookie
      const cookiePuzzles = Object.keys(parsedIkV2Cookie.puzzles)
      // Get anonymous puzzle data for the ids in user's cookie
      const anonPuzzleDataByCookieId = anonPuzzles.filter(({ id }) =>
        cookiePuzzles.includes(id)
      )
      // Get rewardable puzzle ids where all steps are in cookie
      const solvedPuzzles = anonPuzzleDataByCookieId.filter(({ steps }) =>
        steps.every((step) => cookieSolvedSteps.includes(step.id))
      )

      // Use solved puzzle ids to get rewardables that do not have a userReward
      const puzzlesWithoutRewards = await db.rewardable.findMany({
        where: {
          id: {
            in: solvedPuzzles.map(({ rewardableId }) => rewardableId),
          },
          NOT: {
            userRewards: {
              some: {
                userId: context.currentUser.id,
              },
            },
          },
        },
        include: {
          asChild: true,
        },
      })

      if (puzzlesWithoutRewards.length) {
        // Create user reward for solved anonymous puzzles
        const puzzleUserRewards = puzzlesWithoutRewards.map(({ id }) => ({
          rewardableId: id,
          userId: context.currentUser.id,
        }))

        // Now anonymously solved puzzles will have a userReward
        await db.userReward.createMany({
          data: puzzleUserRewards,
          skipDuplicates: true,
        })

        // Get all unique parentIds from the solved puzzles
        const parentIds = new Set(
          puzzlesWithoutRewards.flatMap(({ asChild }) =>
            asChild.map(({ parentId }) => parentId)
          )
        )

        // Get all parent packs for the newly solved puzzles
        const packRewardables = await db.rewardable.findMany({
          where: {
            id: {
              in: Array.from(parentIds),
            },
            type: 'PACK',
          },
          select: {
            id: true,
            asParent: {
              select: {
                childRewardable: {
                  select: {
                    userRewards: {
                      where: {
                        userId: context.currentUser.id,
                      },
                    },
                  },
                },
              },
            },
          },
        })

        // Get the rewardable id for every pack whose children have been solved
        const unrewardedPackRewardables = packRewardables
          .filter(({ asParent }) =>
            asParent.every(
              ({ childRewardable }) => childRewardable.userRewards.length
            )
          )
          .map(({ id }) => id)

        const packUserRewards = unrewardedPackRewardables.map((id) => ({
          rewardableId: id,
          userId: context.currentUser.id,
        }))

        // Now packs will have a userReward if solving an anon puzzle results
        // in solving a pack

        await db.userReward.createMany({
          data: packUserRewards,
          skipDuplicates: true,
        })
      }
    }

    // Check ik-id|ik-puzzles cookie.
    if (
      // All this just to ensure cookies are present
      typeof context.event === 'object' &&
      'headers' in context.event &&
      typeof context.event.headers === 'object' &&
      'cookie' in context.event.headers &&
      typeof context.event.headers.cookie === 'string'
    ) {
      // If user has an ikV1 cookie, grab it
      const ikV1Cookie = cookie.parse(context.event.headers.cookie)[
        IK_ID_COOKIE
      ]
      if (ikV1Cookie) {
        await reconcileV1PuzzlesToV2Steps(ikV1Cookie)
        // @TODO: if this runs successfully, delete the old cookie
        // @link https://www.guru99.com/cookies-in-javascript-ultimate-guide.html
      }
      // If user has ikV2 cookie, grab and process
      const ikV2Cookie = cookie.parse(context.event.headers.cookie)[
        PUZZLE_COOKIE_NAME
      ]
      if (ikV2Cookie) {
        await reconcileCookieRewardables(ikV2Cookie)
      }
    }

    return true
  }

/**
 * All Steps solved by the current user
 */
export const userProgress: QueryResolvers['userProgress'] = () => {
  if (!context?.currentUser?.id) {
    throw new Error('No current user')
  }
  return db.step.findMany({
    select: { id: true, puzzleId: true, stepSortWeight: true },
    orderBy: { stepSortWeight: 'asc' },
    where: {
      attempts: {
        some: {
          userId: context.currentUser.id,
          solve: {
            userId: context.currentUser.id,
          },
        },
      },
    },
  })
}

// Richard Burd's unique service:
export const createBurdPuzzle: MutationResolvers['createBurdPuzzle'] = async ({
  input,
}) => {
  if (!input.puzzle) {
    throw new Error('No puzzle')
  }

  const rewardable = await db.rewardable.create({
    data: {
      name: input.name,
      explanation: input.explanation,
      type: input.type,
      slug: input.slug,
      listPublicly: input.listPublicly,
      orgId: 'cla9yay7y003k08la2z4j2xrv',
      puzzle: {
        create: {
          isAnon: input.puzzle.isAnon,
          steps: {
            create: [
              {
                failMessage: 'You failed',
                successMessage: 'grats',
                stepSortWeight: 0,
                type: 'SIMPLE_TEXT',
              },
            ],
          },
        },
      },
    },
  })
  // const rewardable = await db.rewardable.create({
  //   data: {
  //     name: input.rewardable.name,
  //     explanation: input.rewardable.explanation,
  //     type: input.rewardable.type,
  //     organization: {
  //       connect: {
  //         id: input.rewardable.orgId,
  //       },
  //     },
  //     slug: input.rewardable.slug,
  //     listPublicly: input.rewardable.listPublicly,
  //     puzzle: {
  //       create: {
  //         isAnon: input.puzzle.isAnon,
  //         steps: {
  //           create: input.puzzle.steps.map((step) => ({
  //             type: step.type,
  //             failMessage: step.failMessage,
  //             stepSortWeight: step.stepSortWeight,
  //           })),
  //         },
  //       },
  //     },
  //   },
  // })
  return rewardable
}

// @TODO: move to lookups
const stepTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'stepSimpleText',
  NFT_CHECK: 'stepNftCheck',
  FUNCTION_CALL: 'stepFunctionCall',
  COMETH_API: 'stepComethApi',
  TOKEN_ID_RANGE: 'stepTokenIdRange',
  ORIUM_API: 'stepOriumApi',
  ASSET_TRANSFER: 'stepAssetTransfer',
  ERC20_BALANCE: 'stepErc20Balance',
  LENS_API: 'stepLensApi',
}

export const createRewardablesStepsNfts: MutationResolvers['createRewardablesStepsNfts'] =
  async ({ input }) => {
    if (input.type === 'PACK') {
      const { nft, ...rest } = input

      const { id } = await db.rewardable.create({
        data: {
          ...rest,
          organization: {
            connect: {
              id: 'cla9yay7y003k08la2z4j2xrv',
            },
          },
          ...(nft?.contractName
            ? {
                nfts: {
                  create: [nft],
                },
              }
            : {}),
        },
      })

      return { id }
    }

    if (input.type === 'PUZZLE') {
      const { nft, steps, rewardableConnection, ...rest } = input

      const formattedSteps = steps.map((step) => {
        const { stepTypeData, ...rest } = step

        return {
          ...rest,
          [stepTypeLookup[step.type]]: {
            create: stepTypeData[stepTypeLookup[step.type]],
          },
        }
      })

      const { id } = await db.rewardable.create({
        data: {
          ...rest,
          organization: {
            connect: {
              id: 'cla9yay7y003k08la2z4j2xrv',
            },
          },
          puzzle: {
            create: {
              steps: {
                create: formattedSteps,
              },
            },
          },
          ...(nft?.contractName
            ? {
                nfts: {
                  create: [nft],
                },
              }
            : {}),
          ...(rewardableConnection?.parentId
            ? {
                asChild: {
                  create: rewardableConnection,
                },
              }
            : {}),
        },
      })

      return { id }
    }
  }
