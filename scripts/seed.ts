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
      authId: 'user_2Yx1tAJCMor3UNpJbcDiPk0ouY4',
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
      authId: 'user_2YVJ5CM05zV0nplPNNYmf8Z0ZJf',
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
      explanation: 'this unused field is slated for deletion',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint:
                  'The biggest river in Brazil rhymes with "Paragon"',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'Piranhas are a group of carnivorous freshwater fish. They are known for their sharp teeth and powerful jaws. There are over 60 species of piranhas, and not all of them are as aggressive as their reputation suggests.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "One of the most critically endangered birds in South America is the Spix's Macaw (Cyanopsitta spixii). This striking blue parrot is native to Brazil and is known for its vibrant blue plumage and distinctive facial markings.\n\nWhat is the name of the River that is full of Piranhas and is home to the Spix's Macaw?",
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
      explanation: 'this unused field is slated for deletion',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint: 'What is the capital of Japan?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "Honshu, Japan's largest island, and it serves as the political, economic, and cultural center of the country.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "The most crucial period in Tokyo's history in relation to samurai is the Edo Period, which lasted for over two and a half centuries. It began in 1603 when Tokugawa Ieyasu, the founder of the Tokugawa Shogunate, became the de facto ruler of Japan and established Edo as the center of his government.",
                      sortWeight: 2,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Edo had a name change later on, can you guess what it is now called?\n\nThis city is on the island of Honshu, and it rhymes with "Portfolio"',
                      sortWeight: 3,
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint:
                  'What Japanese food has raw fish wrapped in rice?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'In the 8th century, the Japanese developed a method of preserving fish with rice and salt, and over time, the rice started to be consumed along with the fish.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Do you know what this food is called?  It rhymes with "Għidni" which is a Maltese word for "tell me".',
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
      explanation: 'this unused field is slated for deletion',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 1,
                type: 'SIMPLE_TEXT',
                solutionHint: 'What is the capital of Greece?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "Welcome, it's time to see what you know about Greece and the Hellenistic world.\n\nHopefully you can answer some geographical questions that you may already know the answers to.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'According to Herodotus and Diodorus of Sicily, the Achaemenids destroyed this famous city in 480 BCE. What is the name of this city?\n\nIt rymes with "Battens" which are narrow strips of wood or other material that are typically used in building construction or in various crafts.',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint: 'What is the biggest island in Greece?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                // this is the thing I have to make work in the form...
                // a "Step" has an array of "stepPage"s so make it work just like the
                // freaking TokenId's you just did.
                stepPage: {
                  create: [
                    // we don't need to have multiple "stepPage"s but we want at least 1 or 2
                    {
                      body: 'Minoan civilization was one of the earliest recorded civilizations in the Mediterranean.\n\nThe Minoans are known for their unique art, architecture, and the mysterious Linear A script, which remains undeciphered.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "The Minoan built the Palace of Knossos, often associated with the mythological Minotaur's labyrinth.\n\nThis ancient palace complex is a significant archaeological site, showcasing advanced Minoan architecture.\n\nWhat is the name of the island where the Palace of Knossos is located?",
                      sortWeight: 2,
                      showStepGuideHint: false,
                      image:
                        'https://res.cloudinary.com/infinity-keys/image/upload/c_scale,w_500,h_500,q_100,f_png,dpr_1/ik-alpha-trophies/ptd4_mrrfd2',
                    },
                    {
                      body: 'The name of the island rymes with "meat".',
                      sortWeight: 3,
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint: 'His name rymed with "Bruce"',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'Titans, led by Cronus, were the first generation of gods in Greek mythology. Cronus had overthrown his father Uranus.\n\nCronus was later overthrown during the Titanomachy, a ten-year war that resulted in the establishment of the Olympian gods as the new ruling deities.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Hera, Poseidon, Demeter, Hestia, and Hades, were known as the Olympian gods because they resided on Mount Olympus, the highest peak in Greece.\n\nWho was the leader of these Olympian gods?',
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
      explanation: 'this unused field is slated for deletion',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 1,
                type: 'NFT_CHECK',
                // NOTE: there is no `<simpleText.solution>` for this step
                solutionHint: 'this unused field is slated for deletion',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'You will need to connect your wallet in order to solve this puzzle.\n\nThis is the only step with a `<type>` of `<NFT_CHECK>` throughout all the puzzles in the seed data.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Metamask, Coinbase Wallet, Rainbow, and WalletConnect are all cryptocurrency wallets and tools that enable users to manage their digital assets. Metamask is a browser extension and mobile app, while Coinbase Wallet is a standalone mobile wallet provided by the popular cryptocurrency exchange Coinbase. Rainbow is a mobile wallet with a user-friendly interface, and WalletConnect is a protocol that allows users to connect their wallets to decentralized applications (DApps) and services securely. These tools play a crucial role in the decentralized finance (DeFi) ecosystem, enabling users to store, send, receive, and interact with various cryptocurrencies and blockchain applications.\n\nYou can connect with Metamask, Coinbase Wallet, Rainbow, or WalletConnect',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 2,
                type: 'SIMPLE_TEXT',
                solutionHint: "What is the name of Egypt's main canal?",
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'Egypt has one of the most crucial waterways globally, facilitating the passage of a vast amount of international trade. It provides the shortest maritime route between Europe and the lands lying around the Indian and western Pacific oceans.\n\nMarch 2021, this waterway gained global attention when a massive container ship named the "Ever Given" ran aground and blocked the canal for six days, disrupting global trade.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint:
                  'This word rhymes with "pisa" - as in the leaning tower of Pisa.',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'The Great Pyramid of Khufu, the largest of the three, originally stood at 146.6 meters (481 feet) tall and had a base measuring 230.4 meters (756 feet) on each side.\n\nIts dimensions are believed to have symbolic and mathematical significance, possibly representing various astronomical and mathematical constants.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Some theories suggest that the dimensions of the Great Pyramid incorporate the golden ratio (approximately 1.618), a mathematical proportion found in many aspects of art, architecture, and nature.\n\nThe builders likely used basic mathematical concepts, such as the Pythagorean theorem, to ensure the accuracy of the pyramid's angles and dimensions.\n\nWhat city are the great pyramids located next to?",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 4,
                type: 'SIMPLE_TEXT',
                solutionHint:
                  'What is the name of Egypt\'s main river? It rhymes with "mile"',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: 'Elephantine Island is one of the oldest inhabited places in Egypt. It was an important trading post and had temples dedicated to Khnum, the ram-headed god of the river the island is located in.\n\nJust downstream from Elephantine Island, Philae Island was the site of the Temple of Isis, dedicated to the goddess Isis. It was an important religious center and home to a complex of temples and structures.',
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: 'Kom Ombo is an archaeological site along the this same river with a double temple dedicated to the gods Sobek (crocodile god) and Horus (falcon god). It\'s an example of ancient Egyptian temple architecture.\n\nThis river is called the "Pi-h\'ior (Ⲡⲏ Ⲏⲟⲩⲟⲣ)" in Coptic and "Ye\'or (יְאֹר)" in Biblical Hebrew. What is the name of this river?',
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
      explanation: 'this unused field is slated for deletion',
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 1,
                type: 'LENS_API',

                solutionHint: 'Follow chair and IK',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 9,
                type: 'ERC20_BALANCE',

                solutionHint: 'Have you an ERC20?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 8,
                type: 'ASSET_TRANSFER',

                solutionHint: 'Have you transferred an asset?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 7,
                type: 'ORIUM_API',

                solutionHint: 'Have you created an Orium scholarship?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 2,
                type: 'NFT_CHECK',

                solutionHint: 'NFT check',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 3,
                type: 'SIMPLE_TEXT',
                solutionHint: 'Simple Text (the password is text)',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 4,
                type: 'TOKEN_ID_RANGE',

                solutionHint: 'token id range',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 5,
                type: 'FUNCTION_CALL',

                solutionHint: 'Have you pet a gotchi?',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
                challenge: 'this unused field is slated for deletion',
                stepSortWeight: 6,
                type: 'COMETH_API',
                solutionHint: 'Cometh API',
                defaultImage: coverImageUrl,
                stepGuideType: 'SEEK',
                stepPage: {
                  create: [
                    {
                      body: "You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
                      sortWeight: 1,
                      showStepGuideHint: false,
                    },
                    {
                      body: "Page two. You just started your night job as a tester for GORE Inc, an AI videogame company.\n\nIt's star is Fred, very powerful LLM trained in every horror book, game, and film to create hyper immersive VR games.",
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
}
