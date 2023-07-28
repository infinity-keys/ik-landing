import { ReactElement } from 'react'

import { StepGuideType } from 'types/graphql'

import ActivateIcon from 'src/components/OverlayIcons/ActivateIcon'
import CollectIcon from 'src/components/OverlayIcons/CollectIcon'
import RewindIcon from 'src/components/OverlayIcons/RewindIcon'
import SeekIcon from 'src/components/OverlayIcons/SeekIcon'
import SolveIcon from 'src/components/OverlayIcons/SolveIcon'
import TrackIcon from 'src/components/OverlayIcons/TrackIcon'

export const overlayContent: {
  [key in StepGuideType]: {
    text: string
    icon: ReactElement
  }
} = {
  SEEK: {
    text: 'The passcode you are looking for can be found on the page',
    icon: <SeekIcon />,
  },
  ACTIVATE: {
    text: 'Complete steps described to pass this test. No thinking required!',
    icon: <ActivateIcon />,
  },
  COLLECT: {
    text: "To complete this step, mint the digital collectible in the link. It's free!",
    icon: <CollectIcon />,
  },
  REWIND: {
    text: 'Missing something? Go back and look for helpful clues.',
    icon: <RewindIcon />,
  },
  INFER: {
    text: 'Unscramble a puzzle. The answer needs to be found and solved.',
    icon: <SolveIcon />,
  },
  TRACK: {
    text: 'Piece of cake! Just follow the accounts on the link to solve this step.',
    icon: <TrackIcon />,
  },
}
