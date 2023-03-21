import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  // An initial, administrative user.
  const adminUser = await db.user.create({
    data: {
      username: 'Administrator',
      authId: 'did:ethr:0xf19621f2Fb459B9954170bf5F2F7b15A2aA1E3f9',
    },
  })

  // An organization the initial user belongs to.
  const adminOrg = await db.organization.create({
    data: {
      name: 'Infinity Keys',
      slug: 'ik',
      users: {
        create: {
          userId: adminUser.id,
        },
      },
    },
  })

  // A rewardable, with an instance of a puzzle
  const firstRewardablePuzzle = await db.rewardable.create({
    data: {
      name: 'Capital of France',
      slug: 'capital-of-france',
      explanation: 'You smell cigarette smoke and baguettes here.',
      type: 'PUZZLE',
      orgId: adminOrg.id,
      puzzle: {
        create: {
          isAnon: false,
          steps: {
            create: [
              {
                challenge: 'What is the capital of France?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                stepSimpleText: {
                  create: {
                    solution: 'Paris',
                  },
                },
              },
            ],
          },
        },
      },
    },
  })

  // A rewardable, with an instance of a puzzle
  const secondRewardablePuzzle = await db.rewardable.create({
    data: {
      name: 'Capital of Japan',
      slug: 'capital-of-japan',
      explanation: 'Saki, Sushi, and Steakhouses.',
      type: 'PUZZLE',
      orgId: adminOrg.id,
      puzzle: {
        create: {
          isAnon: false,
          steps: {
            create: [
              {
                challenge: 'What is the capital of Japan?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                stepSimpleText: {
                  create: {
                    solution: 'Tokyo',
                  },
                },
              },
            ],
          },
        },
      },
    },
  })

  // Create a new Pack called "Europe"
  const bigCitiesPack = await db.rewardable.create({
    data: {
      name: 'Big Cities',
      slug: 'big-cities',
      explanation: 'These are major cities you may someday visit!',
      type: 'PACK',
      orgId: adminOrg.id,
      pack: {
        create: {},
      },
    },
  })

  // Associate the firstRewardablePuzzle with the Europe Pack
  await db.rewardableConnection.create({
    data: {
      parentRewardable: { connect: { id: bigCitiesPack.id } },
      childRewardable: { connect: { id: firstRewardablePuzzle.id } },
      childSortWeight: 1,
    },
  })

  // Associate the secondRewardablePuzzle with the Europe Pack
  await db.rewardableConnection.create({
    data: {
      parentRewardable: { connect: { id: bigCitiesPack.id } },
      childRewardable: { connect: { id: secondRewardablePuzzle.id } },
      childSortWeight: 2,
    },
  })
}
