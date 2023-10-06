import { ReactElement } from 'react'

import { PuzzleRequirements } from 'types/graphql'

import AccountIcon from 'src/components/PuzzleIcons/AccountIcon'
import DetailIcon from 'src/components/PuzzleIcons/DetailIcon'
import HoldersOnlyIcon from 'src/components/PuzzleIcons/HoldersOnlyIcon'
import InteractiveObjectIcon from 'src/components/PuzzleIcons/InteractiveObjectIcon'
import PatienceIcon from 'src/components/PuzzleIcons/PatienceIcon'
import TravelIcon from 'src/components/PuzzleIcons/TravelIcon'
import WalletGasIcon from 'src/components/PuzzleIcons/WalletGasIcon'
import WordPlayIcon from 'src/components/PuzzleIcons/WordPlayIcon'

export const requirementsLookup: {
  [key in PuzzleRequirements]: {
    text: string
    labelElement: ReactElement
    icon: ReactElement
  }
} = {
  SOCIAL_ACCOUNT: {
    text: 'This mission requires an active social account.',
    labelElement: (
      <span>
        Social
        <br />
        Account
      </span>
    ),
    icon: <AccountIcon />,
  },
  WALLET_GAS: {
    text: 'You need your own web3 wallet and gas tokens for this mission.',
    labelElement: (
      <span>
        Wallet
        <br />& Gas
      </span>
    ),
    icon: <WalletGasIcon />,
  },
  HOLDERS_ONLY: {
    text: 'You need an NFT to play this mission.',
    labelElement: (
      <span>
        Only
        <br />
        Holders
      </span>
    ),
    icon: <HoldersOnlyIcon />,
  },
  PATIENCE: {
    text: 'Arm yourself with patience, pen and paper. This is a difficult hunt.',
    labelElement: (
      <span>
        Time &
        <br />
        Patience
      </span>
    ),
    icon: <PatienceIcon />,
  },
  TRAVEL: {
    text: 'This mission requires you to physically locate to a location.',
    labelElement: (
      <span>
        Travel
        <br />
        Required
      </span>
    ),
    icon: <TravelIcon />,
  },
  WORDPLAY: {
    text: 'This mission requires wordplay.',
    labelElement: (
      <span>
        Includes
        <br />
        Wordplay
      </span>
    ),
    icon: <WordPlayIcon />,
  },
  DETAIL: {
    text: 'This mission requires close inspection.',
    labelElement: (
      <span>
        An Eye
        <br />
        for Detail
      </span>
    ),
    icon: <DetailIcon />,
  },
  INTERACTIVE_OBJECT: {
    text: 'This mission requires manipulating objects.',
    labelElement: (
      <span>
        Interactive
        <br />
        Object
      </span>
    ),
    icon: <InteractiveObjectIcon />,
  },
}
