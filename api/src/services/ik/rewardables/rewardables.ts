import {
  IK_CLAIMS_NAMESPACE,
  PAGINATION_COUNTS,
  PUZZLE_COOKIE_NAME,
} from '@infinity-keys/constants'
import { IK_ID_COOKIE } from '@infinity-keys/constants'
import { IkJwt } from '@infinity-keys/core'
import cookie, { parse } from 'cookie'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'
// import { context } from '@redwoodjs/graphql-server'

import { PuzzlesData } from 'src/lib/cookie'
import { db } from 'src/lib/db'
import { decryptAndDecompressText } from 'src/lib/encoding/encoding'
import { verifyToken } from 'src/lib/jwt'
import { logger } from 'src/lib/logger'

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

export const rewardablesCollection: QueryResolvers['rewardablesCollection'] =
  async ({ type, page = 1, count = 16 }) => {
    const skip = (page - 1) * count
    const [smallestPaginationCount] = PAGINATION_COUNTS
    const take = PAGINATION_COUNTS.includes(count)
      ? count
      : smallestPaginationCount

    return {
      rewardables: await db.rewardable.findMany({
        where: { type, listPublicly: true },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      totalCount: await db.rewardable.count({
        where: { type, listPublicly: true },
      }),
    }
  }

// @TODO: what is this return type?
export const rewardableClaim = ({ id }) => {
  return db.rewardable.findUnique({
    where: { id },
    select: {
      type: true,
      nfts: {
        select: {
          tokenId: true,
        },
      },
      userRewards: {
        where: { userId: context.currentUser.id },
        select: {
          id: true,
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

export const addNftReward: QueryResolvers['userReward'] = async ({ id }) => {
  const rewardable = await db.rewardable.findUnique({
    where: { id },
    select: {
      type: true,
      userRewards: {
        where: { userId: context.currentUser.id },
        select: {
          id: true,
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
            },
          },
        },
      },
      nfts: {
        select: {
          id: true,
        },
      },
    },
  })

  const isPack = rewardable.type === 'PACK'

  if (isPack) {
    const allPuzzlesSolved = rewardable.asParent.every(
      ({ childRewardable }) => childRewardable.userRewards.length > 0
    )

    if (!allPuzzlesSolved) {
      throw new ForbiddenError('You have not solved all the associated puzzles')
    }
  }

  return db.userReward.update({
    where: {
      userId_rewardableId: {
        userId: context.currentUser.id,
        rewardableId: id,
      },
    },
    data: {
      nfts: {
        connect: {
          id: rewardable.nfts[0].id,
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
      logger.info(`User ${context.currentUser.id} has ikV1 cookie, reconciling`)
      // Parse and verify the old JWT to figure out what (old) puzzles a user solved
      const verifiedIkV1Jwt = await verifyToken(ikV1Cookie)
      const payload = verifiedIkV1Jwt.payload as unknown as IkJwt
      const oldPuzzleNames = payload.claims[IK_CLAIMS_NAMESPACE].puzzles || []

      // Now, loop through old puzzles, and write to DB that user has solved them
      // in the v2 equivalent. Puzzles in v1 are Steps in v2.

      // 1. Find Solves, through Attempts, to Steps that match the old puzzle names.
      // This determines if we already have record of the user's v1 puzzles in
      // the v2 DB.
      const existingSolves = await db.step.findMany({
        select: { id: true, migrateLandingRoute: true },
        where: {
          migrateLandingRoute: {
            in: oldPuzzleNames,
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

      // 2. Steps we have NOT solved in the new system, these need to be reconciled
      const oldPuzzlesUnsolvedInV2 = oldPuzzleNames.filter((oldPuzzleName) => {
        return !existingSolves.find(
          ({ migrateLandingRoute }) => migrateLandingRoute === oldPuzzleName
        )
      })

      // 3. Create new Attempts + Solves for each of the old puzzles that we
      // haven't solved yet
      const newSolves = oldPuzzlesUnsolvedInV2.map((puzzlePath) => {
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

      // 4. Fire off all the Solve + Attempt creations
      await Promise.all(newSolves)
    }

    /**
     * Convert anonymous Rewardables to signed-in user progress cookie
     * NOTE: Step IDs are reset during `migrate reset`, so we won't always have
     * IDs from the cookie in the DB. Catch and log.
     */
    const reconcileCookieRewardables = async (ikV2Cookie: string) => {
      // Parse ik-puzzles cookie
      const v2CookieClearText = decryptAndDecompressText(ikV2Cookie)
      const parsedIkV2Cookie = PuzzlesData.parse(JSON.parse(v2CookieClearText))

      if (parsedIkV2Cookie.authId !== context.currentUser.authId) {
        return logger.warn(
          `User ${context.currentUser.id} has ikV2 cookie, but authId does not match`
        )
      }

      // Just loop through all records in the cookie and see if any are missing in db
      const cookieSolvedSteps = Object.entries(
        parsedIkV2Cookie.puzzles
      ).flatMap(([puzzleId, puzzleData]) => puzzleData.steps)

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
