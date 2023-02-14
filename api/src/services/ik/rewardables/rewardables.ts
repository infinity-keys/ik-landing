import {
  IK_CLAIMS_NAMESPACE,
  PAGINATION_COUNTS,
} from '@infinity-keys/constants'
import { IK_ID_COOKIE } from '@infinity-keys/constants'
import { IkJwt } from '@infinity-keys/core'
import cookie from 'cookie'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'
// import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
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

export const reconcileProgress: MutationResolvers['reconcileProgress'] =
  async () => {
    // console.log(context.currentUser)

    /**
     * Convert v1 Puzzles to v2 Steps
     */
    const reconcileV1PuzzlesToV2Steps = async (ikV1Cookie: string) => {
      logger.info('User has ikV1 cookie, reconciling')
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

    // Check ik-id cookie. Look for key that says this has been parsed already.
    if (
      // All this just to ensure cookies are present
      typeof context.event === 'object' &&
      'headers' in context.event &&
      typeof context.event.headers === 'object' &&
      'cookie' in context.event.headers &&
      typeof context.event.headers.cookie === 'string'
    ) {
      // If a user has an ikV1 cookie, grab it
      const ikV1Cookie = cookie.parse(context.event.headers.cookie)[
        IK_ID_COOKIE
      ]
      if (ikV1Cookie) {
        await reconcileV1PuzzlesToV2Steps(ikV1Cookie)
      }

      // @TODO: if this runs successfully, delete the old cookie
      // @link https://www.guru99.com/cookies-in-javascript-ultimate-guide.html
    }

    // Now, check ik-puzzles cookie (new). Look for known anonymous cookies to
    //  associate with the user.

    return true
  }

export const userProgress = async () => {
  console.log(context.currentUser)

  const existingSolves = await db.step.findMany({
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

  return existingSolves
}
