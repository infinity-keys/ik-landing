import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import type { RewardableType, SiteRole, StepType } from 'api/types/graphql'

// Stable IK org ID
const ikCuid = 'cla9yay7y003k08la2z4j2xrv'

// @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

export default async () => {
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

  await Promise.all(
    userOrg.map(async (data: Prisma.UserCreateArgs['data']) => {
      return await db.user.create({ data })
    })
  )

  const ikUsersData: Prisma.UserCreateArgs['data'][] = [
    {
      id: 'clfbb0aw70095me24zy00lago',
      email: 'bloomcb@gmail.com',
      authId: 'did:ethr:0x71F832147375264368Dfb39cbceE8aeF39e6d50C',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfbb0mix009tme24zjb3ty7z',
      email: 'itsmekori@infinitykeys.io',
      authId: 'did:ethr:0xdbf8A4E65F0ef649797f7554ED6D03A32E67bD6D',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfbb35mj00adme24m0mpx5w2',
      email: 'andyboyan@gmail.com',
      authId: 'did:ethr:0x1F4d944219b078B2A66C63962FD2E99e2132e319',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfbeh0x90000l6z61p1dix7g',
      email: 'tawnee.la@gmail.com',
      authId: 'did:ethr:0xF252C8aF80C637030Bb9691eDFa62042156315D7',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfboa6v70009id24jvb4jps9',
      email: 'tawnee@infinitykeys.io',
      authId: 'did:ethr:0xFA52F4fEd899EB4a2c70100D83FfD5e9a5169f19',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfbpp4kf000d08mmg3pdatx9',
      email: 'skeleton@infinitykeys.io',
      authId: 'did:ethr:0x73ccc0F5A6059603570BB2bA48d84afdEd4E8593',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
    {
      id: 'clfbqfryd000008i8dlmn3elb',
      email: 'rick.a.burd@gmail.com',
      authId: 'did:ethr:0xF09818A04FF3fEB2705AA0cC235901b0fC363dec',
      roles: ['ADMIN'] as SiteRole[],
      organizations: {
        create: [
          {
            organization: {
              connect: {
                id: ikCuid,
              },
            },
          },
        ],
      },
    },
  ]

  const users = await Promise.all(
    ikUsersData.map(async (data: Prisma.UserCreateArgs['data']) => {
      return db.user.create({ data })
    })
  )

  console.log(`created ${users.length} users`)

  // A rewardable, with an instance of a puzzle
  const firstRewardablePuzzle = await db.rewardable.create({
    data: {
      name: 'Capital of France',
      slug: 'capital-of-france',
      explanation: 'You smell cigarette smoke and baguettes here.',
      type: 'PUZZLE',
      orgId: ikCuid,
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

  // A rewardable, with an instance of a puzzle
  const secondRewardablePuzzle = await db.rewardable.create({
    data: {
      name: 'Capital of Japan',
      slug: 'capital-of-japan',
      explanation: 'Saki, Sushi, and Steakhouses.',
      type: 'PUZZLE',
      orgId: ikCuid,
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

  // Chris and U will make a pack tomorrow...

  const puzzles = await Promise.all([
    firstRewardablePuzzle,
    secondRewardablePuzzle,
  ])
}

// Create a new Pack called "Big-Cities"
// const bigCitiesPack = await db.rewardable.create({
//   data: {
//     name: 'Big Cities',
//     slug: 'big-cities',
//     explanation: 'These are major cities you may someday visit!',
//     type: 'PACK',
//     orgId: ikCuid,
//     organization: {
//       connect: {
//         // id: ikCuid,
//       },
//     },
//     // pack: {
//     //   create: {

//     //   },
//     // },
//   },
// })

// Associate the firstRewardablePuzzle with the Big-Cities Pack
//   await db.rewardableConnection.create({
//     data: {
//       parentRewardable: { connect: { id: bigCitiesPack.id } },
//       childRewardable: { connect: { id: firstRewardablePuzzle.id } },
//       childSortWeight: 1,
//     },
//   })

//   // Associate the secondRewardablePuzzle with the Big-Cities Pack
//   await db.rewardableConnection.create({
//     data: {
//       parentRewardable: { connect: { id: bigCitiesPack.id } },
//       childRewardable: { connect: { id: secondRewardablePuzzle.id } },
//       childSortWeight: 2,
//     },
//   })
// }

// Create a non-admin user with (with no org?)
// Couple this user with the Magic-Link API key
// Magic-Link API key goes in the .env file?
// This is the user that will automatically sign in when thier name is
// entered in by anybody on the IK dev team.

// Create two steps for the Tokyo Japan puzzle
// make the rewardable only available after finishing the final puzzle

// Couple both puzzles with NFT rewards
