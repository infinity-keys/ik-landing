import { ReactElement } from 'react'

import { StepGuideType } from 'types/graphql'

import ActivateIcon from 'src/components/OverlayIcons/ActivateIcon'
import ActivateMiniIcon from 'src/components/OverlayIcons/ActivateMiniIcon'
import CollectIcon from 'src/components/OverlayIcons/CollectIcon'
import CollectMiniIcon from 'src/components/OverlayIcons/CollectMiniIcon'
import RewindIcon from 'src/components/OverlayIcons/RewindIcon'
import RewindMiniIcon from 'src/components/OverlayIcons/RewindMiniIcon'
import SeekIcon from 'src/components/OverlayIcons/SeekIcon'
import SeekMiniIcon from 'src/components/OverlayIcons/SeekMiniIcon'
import SolveIcon from 'src/components/OverlayIcons/SolveIcon'
import SolveMiniIcon from 'src/components/OverlayIcons/SolveMiniIcon'
import TrackIcon from 'src/components/OverlayIcons/TrackIcon'
import TrackMiniIcon from 'src/components/OverlayIcons/TrackMiniIcon'

export const overlayContent: {
  [key in StepGuideType]: {
    text: string
    icon: ReactElement
    mini: ReactElement
  }
} = {
  SEEK: {
    text: 'The passcode you are looking for can be found on the page',
    icon: <SeekIcon />,
    mini: <SeekMiniIcon />,
  },
  ACTIVATE: {
    text: 'Complete steps described to pass this test. No thinking required!',
    icon: <ActivateIcon />,
    mini: <ActivateMiniIcon />,
  },
  COLLECT: {
    text: "To complete this step, mint the digital collectible in the link. It's free!",
    icon: <CollectIcon />,
    mini: <CollectMiniIcon />,
  },
  REWIND: {
    text: 'Missing something? Go back and look for helpful clues.',
    icon: <RewindIcon />,
    mini: <RewindMiniIcon />,
  },
  INFER: {
    text: 'Unscramble a puzzle. The answer needs to be found and solved.',
    icon: <SolveIcon />,
    mini: <SolveMiniIcon />,
  },
  TRACK: {
    text: 'Piece of cake! Just follow the accounts on the link to solve this step.',
    icon: <TrackIcon />,
    mini: <TrackMiniIcon />,
  },
}
