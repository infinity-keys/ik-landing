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
      authId: 'user_2YVGlBRhqVGfnUsqzU19t7q7QNl',
    },
    {
      id: 'clfbb35mj00adme24m0mpx5w2',
      email: 'andyboyan@gmail.com',
      authId: 'did:ethr:0x1F4d944219b078B2A66C63962FD2E99e2132e319',
    },
    {
      id: 'clfbeh0x90000l6z61p1dix7g',
      email: 'tawnee.la@gmail.com',
      authId: 'user_2YRwmoTgUREEGULLUVSNzYOxV7s',
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

  const protagonistUser = ikUsersData.at(-1)
  const coverImageUrl =
    'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/nft-181_eeo6d3'

  if (!protagonistUser) {
    throw new Error('Missing users data')
  }

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

  // const testStep: CreateStepInput = testPuzzle.step
  const puzzle1 = await db.rewardable.create({
    data: {
      name: 'Puzzle 1 (Brazil)',
      slug: 'puzzle-1',
      explanation: 'This is the first puzzle, it is about Brazil',
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
          requirements: ['SOCIAL_ACCOUNT', 'WALLET_GAS', 'HOLDERS_ONLY'],
          coverImage: coverImageUrl,
          steps: {
            create: [
              {
                challenge: 'What is the biggest river in Brazil?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Amazon',
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
      name: 'Puzzle 2 (Japan)',
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
          requirements: ['SOCIAL_ACCOUNT'],
          coverImage: coverImageUrl,
          steps: {
            create: [
              {
                challenge: 'What is the capital of Japan?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Tokyo',
                  },
                },
              },
              {
                challenge: 'What Japanese food has raw fish wrapped in rice?',
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepSimpleText: {
                  create: {
                    solution: 'Sushi',
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

  const puzzle3 = await db.rewardable.create({
    data: {
      name: 'Puzzle 3 (Greece)',
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
          requirements: ['SOCIAL_ACCOUNT'],
          coverImage: coverImageUrl,
          steps: {
            create: [
              {
                challenge: 'What is the capital of Greece?',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Athens',
                  },
                },
              },
              {
                challenge: 'What is the biggest island in Greece?',
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Crete',
                  },
                },
              },
              {
                challenge: 'Who is head of the ancient Greek Olympian gods?',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Zeus',
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
      name: 'Puzzle 4 (Egypt)',
      slug: 'puzzle-4',
      explanation:
        'This is the forth puzzle, it is about Egypt, you must be logged in to solve it',
      type: 'PUZZLE',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      // Connect the nft2 to 'puzzle4' in this rewardable
      nfts: {
        connect: {
          id: nft2.id,
        },
      },
      puzzle: {
        create: {
          requirements: ['SOCIAL_ACCOUNT'],
          coverImage: coverImageUrl,
          steps: {
            create: [
              {
                challenge:
                  'You must have the Prerequiste NFT in order to enter Egypt',
                stepSortWeight: 1,
                type: 'NFT_CHECK',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepNftCheck: {
                  create: {
                    nftCheckData: {
                      create: {
                        contractAddress:
                          '0x54b743D6055e3BBBF13eb2C748A3783516156e5B',
                        chainId: 10,
                        tokenId: 1,
                      },
                    },
                  },
                },
              },
              {
                challenge: "What is the name of Egypt's main canal?",
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Suez',
                  },
                },
              },
              {
                challenge: 'Where are the great pyramids?',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Giza',
                  },
                },
              },
              {
                challenge: "What is the name of Egypt's main river?",
                stepSortWeight: 4,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepSimpleText: {
                  create: {
                    solution: 'Nile',
                  },
                },
              },
            ],
          },
        },
      },
    },
  })

  const _puzzle5 = await db.rewardable.create({
    data: {
      name: 'Puzzle 5 (Step Types)',
      slug: 'puzzle-5',
      explanation: 'Just going to have every step type in here so get ready',
      type: 'PUZZLE',
      organization: {
        connect: {
          id: ikOrg.id,
        },
      },
      // Connect the nft2 to 'puzzle5' in this rewardable
      nfts: {
        connect: {
          id: nft2.id,
        },
      },
      puzzle: {
        create: {
          requirements: ['SOCIAL_ACCOUNT'],
          coverImage: coverImageUrl,
          steps: {
            create: [
              {
                challenge: 'Follow chair and IK',
                stepSortWeight: 1,
                type: 'LENS_API',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepLensApi: {
                  create: {
                    checkType: 'IS_FOLLOWING_USER',
                    followedUserIds: ['0x0117a3', '0xdfab'],
                  },
                },
              },
              {
                challenge: 'Have you an ERC20?',
                stepSortWeight: 9,
                type: 'ERC20_BALANCE',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepErc20Balance: {
                  create: {
                    contractAddress:
                      '0x3801c3b3b5c98f88a9c9005966aa96aa440b9afc',
                    chainId: '0x89',
                    minBalance: '1000000000000000000',
                  },
                },
              },
              {
                challenge: 'Have you transferred an asset?',
                stepSortWeight: 8,
                type: 'ASSET_TRANSFER',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },
                stepAssetTransfer: {
                  create: {
                    toAddress: '0xc22834581ebc8527d974f8a1c97e1bea4ef910bc',
                    excludeZeroValue: false,
                  },
                },
              },
              {
                challenge: 'Have you created an Orium scholarship?',
                stepSortWeight: 7,
                type: 'ORIUM_API',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepOriumApi: {
                  create: {
                    checkType: 'HAS_CREATED_SCHOLARSHIP',
                  },
                },
              },
              {
                challenge: 'NFT check',
                stepSortWeight: 2,
                type: 'NFT_CHECK',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepNftCheck: {
                  create: {
                    nftCheckData: {
                      create: {
                        contractAddress:
                          '0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9',
                        chainId: 137,
                        tokenId: 1,
                      },
                    },
                  },
                },
              },
              {
                challenge: 'Simple Text (the password is text)',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepSimpleText: {
                  create: {
                    solution: 'text',
                  },
                },
              },
              {
                challenge: 'token id range',
                stepSortWeight: 4,
                type: 'TOKEN_ID_RANGE',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepTokenIdRange: {
                  create: {
                    contractAddress:
                      '0xA4E3513c98b30d4D7cc578d2C328Bd550725D1D0',
                    chainId: '137',
                    startIds: [13232],
                    endIds: [13277],
                  },
                },
              },
              {
                challenge: 'Have you pet a gotchi?',
                stepSortWeight: 5,
                type: 'FUNCTION_CALL',

                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepFunctionCall: {
                  create: {
                    methodIds: ['0x22c67519'],
                    contractAddress:
                      '0x86935F11C86623deC8a25696E1C19a8659CbF95d',
                  },
                },
              },
              {
                challenge: 'Cometh API',
                stepSortWeight: 6,
                type: 'COMETH_API',
                solutionHint: 'Hint',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt’s star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.',
                      sortWeight: 2,
                      showStepGuideHint: true,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                  ],
                },

                stepComethApi: {
                  create: {},
                },
              },
            ],
          },
        },
      },
    },
  })

  console.log('Puzzles created')

  // protagonistUser attempts only step in Puzzle 1
  // ...and enters the correct answer
  const attempt1 = await db.attempt.create({
    data: {
      data: ['Brazil'],
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      step: {
        connect: {
          id: puzzle1.puzzle?.steps[0].id,
        },
      },
    },
  })

  // protagonistUser solves only step in Puzzle 1
  const _solve1 = await db.solve.create({
    //solve (not userReward) like in "const solve2"
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
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

  // protagonistUser attempts step 1 of 2 in Puzzle 2
  // ...and enters the correct answer
  const attempt2 = await db.attempt.create({
    data: {
      data: [{ solution: 'tokyo' }],
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      step: {
        connect: {
          id: puzzle2.puzzle?.steps[0].id,
        },
      },
    },
  })

  // protagonistUser solves step 1 of 2 in Puzzle 2
  const _solve2 = await db.solve.create({
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      attempt: {
        connect: {
          id: attempt2.id,
        },
      },
      data: {}, // Optional additional data, you can provide an object here if needed
    },
  })

  // protagonistUser gets a reward for Puzzle 1
  const _userReward1 = await db.userReward.create({
    // userReward (not solve) like in "const solve1"
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      rewardable: {
        connect: {
          id: puzzle1.id,
        },
      },
    },
  })

  // protagonistUser attempts step 2 of 2 in Puzzle 2
  // ...but enters the wrong answer
  const _attempt3 = await db.attempt.create({
    data: {
      data: [{ solution: 'sashimi' }],
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      step: {
        connect: {
          id: puzzle2.puzzle?.steps[1].id,
        },
      },
    },
  })

  // protagonistUser attempts step 2 of 2 in Puzzle 2
  // ...and this time enters the correct answer
  const attempt4 = await db.attempt.create({
    data: {
      data: [{ solution: 'sushi' }],
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      step: {
        connect: {
          id: puzzle2.puzzle?.steps[1].id,
        },
      },
    },
  })

  // protagonistUser solves step 2 of 2 in Puzzle 2
  const _solve3 = await db.solve.create({
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      attempt: {
        connect: {
          id: attempt4.id,
        },
      },
      data: {},
    },
  })

  // protagonistUser gets a reward for Puzzle 2
  const _userReward2 = await db.userReward.create({
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      rewardable: {
        connect: {
          id: puzzle2.id,
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

  // user rick.a.burd@gmail.com gets a reward for Pack1 1
  const _userReward3 = await db.userReward.create({
    // userReward (not solve) like in "const solve1"
    data: {
      user: {
        connect: {
          id: protagonistUser.id,
        },
      },
      rewardable: {
        connect: {
          id: pack1.id,
        },
      },
    },
  })

  const _pack2 = await db.rewardable.create({
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
  // 1. puzzles should be created that are not rewardable
  // 2. http://localhost:8910/profile should show 1 or more NFTs
  // NOTE: `Submission` is outdated and will eventually be deleted; currently we use `Attempt` instead
}
