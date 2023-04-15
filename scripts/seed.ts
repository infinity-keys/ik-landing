import { db } from 'api/src/lib/db'

export default async () => {
  // The starting IK org that all of team and Rewardables belong to
  const ikOrg = await db.organization.create({
    data: {
      id: 'cla9yay7y003k08la2z4j2xrv', // Stable IK org ID
      name: 'Infinity Keys',
      slug: 'ik',
    },
  })

  console.log(`created ${ikOrg.name} organization`)

  // siteRole { ADMIN } user data
  const ikUsersData = [
    {
      email: 'infinitykeys_devs@protonmail.com',
      authId: 'did:ethr:0xf19621f2Fb459B9954170bf5F2F7b15A2aA1E3f9',
    },
    {
      id: 'clfbb0aw70095me24zy00lago',
      email: 'bloomcb@gmail.com',
      authId: 'did:ethr:0x71F832147375264368Dfb39cbceE8aeF39e6d50C',
    },
    {
      id: 'clfbb0mix009tme24zjb3ty7z',
      email: 'itsmekori@infinitykeys.io',
      authId: 'did:ethr:0xdbf8A4E65F0ef649797f7554ED6D03A32E67bD6D',
    },
    {
      id: 'clfbb35mj00adme24m0mpx5w2',
      email: 'andyboyan@gmail.com',
      authId: 'did:ethr:0x1F4d944219b078B2A66C63962FD2E99e2132e319',
    },
    {
      id: 'clfbeh0x90000l6z61p1dix7g',
      email: 'tawnee.la@gmail.com',
      authId: 'did:ethr:0xF252C8aF80C637030Bb9691eDFa62042156315D7',
    },
    {
      id: 'clfboa6v70009id24jvb4jps9',
      email: 'tawnee@infinitykeys.io',
      authId: 'did:ethr:0xFA52F4fEd899EB4a2c70100D83FfD5e9a5169f19',
    },
    {
      id: 'clfbpp4kf000d08mmg3pdatx9',
      email: 'skeleton@infinitykeys.io',
      authId: 'did:ethr:0x73ccc0F5A6059603570BB2bA48d84afdEd4E8593',
    },
    {
      id: 'clfbqfryd000008i8dlmn3elb',
      email: 'rick.a.burd@gmail.com',
      authId: 'did:ethr:0xF09818A04FF3fEB2705AA0cC235901b0fC363dec',
      twitterProfile: 'Richard_A_Burd',
      discordProfile: 'Richard Burd#6701',
    },
  ]

  // create the siteRole { ADMIN } users
  const adminUsers = await Promise.all(
    ikUsersData.map((data) => {
      return db.user.create({
        data: {
          ...data,
          roles: ['ADMIN'],
          organizations: {
            // This is actually OrganizationUser
            create: {
              organization: {
                connect: {
                  id: ikOrg.id,
                },
              },
            },
          },
        },
      })
    })
  )

  console.log(`created ${adminUsers.length} IK admin users`)

  // Create an NFT for puzzle1
  const nft1 = await db.nft.create({
    data: {
      tokenId: 1,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/starter-pack-achievment_cdbvlv',
    },
  })

  // Create an NFT for puzzle4
  const nft2 = await db.nft.create({
    data: {
      tokenId: 2,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/Map-24_tulnvo',
    },
  })

  // Create an NFT for pack1
  const pack1Nft = await db.nft.create({
    data: {
      tokenId: 3,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/horn-polish_o3gcba',
    },
  })

  // Create an NFT for pack2
  const pack2Nft = await db.nft.create({
    data: {
      tokenId: 4,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/probably0-astro_hk9mnl',
    },
  })

  const puzzle1 = await db.rewardable.create({
    data: {
      name: 'Puzzle 1',
      slug: 'puzzle-1',
      explanation:
        'This is the first puzzle, it is anonymous so you can solve it without logging in',
      type: 'PUZZLE',
      orgId: ikOrg.id,

      // Connect the NFT to 'puzzle1' in this rewardable
      nfts: {
        connect: {
          id: nft1.id,
        },
      },
      puzzle: {
        create: {
          isAnon: true,
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
    // required for user rick.a.burd to attempt this puzzle
    include: {
      puzzle: {
        include: {
          steps: true,
        },
      },
    },
  })

  const puzzle2 = await db.rewardable.create({
    data: {
      name: 'Puzzle 2',
      slug: 'puzzle-2',
      explanation:
        'This is the second puzzle, you must be logged in to solve it',
      type: 'PUZZLE',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
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

  const puzzle3 = await db.rewardable.create({
    data: {
      name: 'Puzzle 3',
      slug: 'puzzle-3',
      explanation:
        'This is the third puzzle, you must be logged in to solve it',
      type: 'PUZZLE',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      puzzle: {
        create: {
          isAnon: false,
          steps: {
            create: [
              {
                challenge: 'What is the capital of Greece?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                stepSimpleText: {
                  create: {
                    solution: 'Athens',
                  },
                },
              },
            ],
          },
        },
      },
    },
  })

  const puzzle4 = await db.rewardable.create({
    data: {
      name: 'Puzzle 4',
      slug: 'puzzle-4',
      explanation:
        'This is the forth puzzle, you must be logged in to solve it',
      type: 'PUZZLE',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      // Connect the NFT to 'puzzle1' in this rewardable
      nfts: {
        connect: {
          id: nft2.id,
        },
      },
      puzzle: {
        create: {
          isAnon: false,
          steps: {
            create: [
              {
                challenge: 'What is the capital of Itlay?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                stepSimpleText: {
                  create: {
                    solution: 'Rome',
                  },
                },
              },
            ],
          },
        },
      },
    },
  })
  console.log('Puzzles created')

  // user rick.a.burd@gmail.com attempts step in Puzzle 1
  const attempt1 = await db.attempt.create({
    data: {
      data: [
        "// schema.prisma says: 'What did they guess/input/confirm/connect?'",
      ],
      user: {
        connect: {
          id: ikUsersData[ikUsersData.length - 1].id,
        },
      },
      step: {
        connect: {
          id: puzzle1.puzzle.steps[0].id,
        },
      },
    },
  })

  // user rick.a.burd@gmail.com solves step in Puzzle 1
  const solve1 = await db.solve.create({
    //solve (not userReward) like in "const solve2"
    data: {
      user: {
        connect: {
          id: ikUsersData[ikUsersData.length - 1].id,
        },
      },
      attempt: {
        connect: {
          id: attempt1.id,
        },
      },
      data: {}, // Optional additional data, you can provide an object here if needed
    },
  })

  // user rick.a.burd@gmail.com solves Puzzle 3
  const solve2 = await db.userReward.create({
    // userReward (not solve) like in "const solve1"
    data: {
      user: {
        connect: {
          id: ikUsersData[ikUsersData.length - 1].id,
        },
      },
      rewardable: {
        connect: {
          id: puzzle3.id,
        },
      },
    },
  })

  const pack1 = await db.rewardable.create({
    data: {
      name: 'Pack 1',
      slug: 'pack-1',
      explanation: 'This is the first pack',
      type: 'PACK',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      // Connect the NFT to 'puzzle1' in this rewardable
      nfts: {
        connect: {
          id: pack1Nft.id,
        },
      },
      pack: {
        create: {},
      },
      asParent: {
        createMany: {
          data: [
            {
              childId: puzzle1.id,

              // order of puzzles in the pack,
              // Defaults to alphabetical order
              childSortWeight: 1,
            },
            {
              childId: puzzle2.id,

              // order of puzzles in the pack,
              // Defaults to alphabetical order
              childSortWeight: 2,
            },
          ],
        },
      },
    },
  })

  const pack2 = await db.rewardable.create({
    data: {
      name: 'Pack 2',
      slug: 'pack-2',
      explanation: 'This is the second pack',
      type: 'PACK',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      // Connect the NFT to 'puzzle2' in this rewardable
      nfts: {
        connect: {
          id: pack2Nft.id,
        },
      },
      pack: {
        create: {},
      },
      asParent: {
        createMany: {
          data: [
            {
              childId: puzzle3.id,

              // order of puzzles in the pack,
              // Defaults to alphabetical order
              childSortWeight: 1,
            },
            {
              childId: puzzle4.id,

              // order of puzzles in the pack,
              // Defaults to alphabetical order
              childSortWeight: 2,
            },
          ],
        },
      },
    },
  })

  // TODOs:
  // 1. Puzzle 3 is solved (green checkmark) but key is not highlighted
  //    ...Puzzle one key is highlighted but not solved (green checkmark)
  //    ...this is because Puzzle 1 has an attempt while Puzzle 3 has a userReward
  //    ...fix this so that it looks right and represents what a player would do.
  // 2. puzzles 1,2,3 & 4 should be renamed as "rewardable"
  // 3. puzzles should be created that are not rewardable
  // 4. Create a pack with 2 anon puzzles and a 3rd that requires sign in to solve,
  //    ...this 3rd puzzle would have the rewardable attached to it.
  // 5. solve1 is a "solve" model whereas solve2 is a "userReward" model
  //    ...untangle these so we have seperate solves and seperate userrewards

  // 1. Rewardable -> Puzzle -> Anon Steps 1-3 -> Step 4 requires sign in -> Reward at the end
  // 2. Rewardable -> Puzzle -> No anonymous steps (1-3) -> Reward at the end
  // 3. Rewardable -> Puzzle -> 12 goddamn steps -> sign in for all, all steps are nft check, passcode, function call, API check
  // 4. The above, but anon for all steps.
  // 5. All of these under 1 pack?
  // 6. A bunch more random pack of simple puzzles to help fill out the /play page

  // NOTE: `Submission` is outdated and will eventually be deleted; currently we use `Attempt` instead
}

/*
Here is an overview of the relationships between the entities in the schema:

    A `Puzzle` is a collection of one or more `Step`s that a player must complete to solve the puzzle.
    A `Step` represents a single challenge or task that the player must complete to progress in the puzzle. A `Step` can have one of several types, such as `StepSimpleText` or `StepNftCheck`, which determine how the player must complete the step.
    A `Rewardable` is a thing that can reward NFTs. It can be a puzzle, a pack, or a bundle.
    A `Pack` is a collection of puzzles. A Bundle is a collection of packs.
    An `Nft` represents an NFT that can be rewarded for completing a Rewardable.
    A `UserReward` represents a reward that a user has earned for completing a Rewardable. It contains a reference to the Rewardable and a list of Nfts that the user has earned.

In summary, a `Puzzle` is a type of `Rewardable` that is made up of `Step`s that a player must complete. A `Rewardable` can also be a `Pack` or a `Bundle`, which are collections of puzzles. Completing a `Rewardable` can earn the player one or more `Nft`s, which are represented by Nft objects. A `UserReward` represents a reward that a user has earned for completing a `Rewardable`, and it contains a reference to the `Rewardable` and a list of `Nft`s that the user has earned.

a `solve` is typically represented as a relationship between a `User` and a `Puzzle`. A `solve` indicates that a particular `User` has solved a specific `Puzzle`. It is implemented as a `UserReward` model in the schema.

When a `User` solves a `Puzzle`, a new `UserReward` is created that connects the `User` and the `Puzzle`. This `UserReward` includes information about the `User` who solved the `Puzzle`, the `Puzzle` that was solved, and the time that the `Puzzle` was solved.

This relationship allows for tracking of which `User`s have solved which `Puzzle`s and can also be used to calculate and assign rewards to the `User`s who successfully solve a `Puzzle`.
*/
