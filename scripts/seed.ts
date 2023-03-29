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

  // Create an NFT for a puzzle
  const nft1 = await db.nft.create({
    data: {
      tokenId: 12345,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/starter-pack-achievment_cdbvlv',
    },
  })

  // Create an NFT for a pack
  const pack1Nft = await db.nft.create({
    data: {
      tokenId: 6789,
      contractName: 'YourContractName',
      data: {
        key: 'value',
      },
      cloudinaryId: 'ik-alpha-trophies/starter-pack-achievment_cdbvlv',
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
  console.log('Puzzles created')

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
        // createMany: {
        //   data: [puzzle1, puzzle2].map((puzzle) => ({
        //     childId: puzzle.id,
        //   })),
        // },
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

  // Create a submission for the user and puzzle1
  const submission = await db.submission.create({
    data: {
      puzzleId: puzzle1.id,
      userId: ikUsersData[ikUsersData.length - 1].id,
      data: {
        // do we need anything here!?
      },
    },
  })

  // TODOs:
  // 1. Rewardable -> Puzzle -> Anon Steps 1-3 -> Step 4 requires sign in -> Reward at the end
  // 2. Rewardable -> Puzzle -> No anonymous steps (1-3) -> Reward at the end
  // 3. Rewardable -> Puzzle -> 12 goddamn steps -> sign in for all, all steps are nft check, passcode, function call, API check
  // 4. The above, but anon for all steps.
  // 5. All of these under 1 pack?
  // 6. A bunch more random pack of simple puzzles to help fill out the /play page

  // 3.28.2023 Burd & Bloom Notes:
  // Seed data should include an `Attempt` for each `Step` and then a `Solve` on final `Step` followed by a `UserReward`
  // `Submission` is outdated and will eventually be deleted; currently we use `Attempt` instead
}
