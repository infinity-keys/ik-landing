import { IK_CLAIMS_NAMESPACE } from '@infinity-keys/constants'

import { Head } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

import IK_TOKENS from 'src/lib/theme/ik-tokens.tokens.json'

interface Props {
  title?: string
  description?: string
  url?: string
  imageUrl?: string
}

const Seo = ({
  title = 'Infinity Keys',
  description = "There's treasure everywhere. Discover clues, solve puzzles, and collect digital items to discover real treasure — or create a quest of your own.",
  url = '',
  imageUrl = new URL('/treasure.jpeg', IK_CLAIMS_NAMESPACE).toString(),
}: Props) => {
  const formattedUrl = new URL(url, 'https://infinitykeys.io')

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        ogUrl={formattedUrl.toString() as `https://${string}`}
        ogContentUrl={imageUrl}
      />
      <Head>
        <meta
          name="theme-color"
          content={IK_TOKENS.brand.color['ik-gold-primary'].$value}
        />
      </Head>
    </>
  )
}

export default Seo
