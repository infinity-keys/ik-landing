import { IK_CLAIMS_NAMESPACE } from 'lib/constants'

import { Head } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

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
    // <Head>
    //   <title>{title}</title>
    //   <meta name="description" content={description} />
    //   <meta name="theme-color" content="#3FCCBB" />

    //   {/* open graph */}
    //   <meta property="og:type" content="website" />
    //   <meta property="og:url" content={formattedUrl.toString()} />
    //   <meta property="og:title" content={title} />
    //   <meta property="og:description" content={description} />
    //   <meta property="og:image" content={imageUrl} />

    //   {/* twitter cards */}
    //   <meta property="twitter:card" content="summary_large_image" />
    //   <meta property="twitter:url" content={formattedUrl.toString()} />
    //   <meta property="twitter:title" content={title} />
    //   <meta property="twitter:description" content={description} />
    //   <meta property="twitter:image" content={imageUrl} />
    // </Head>
    <>
      <MetaTags
        title={title}
        description={description}
        ogUrl=""
        ogContentUrl={imageUrl}
      />
      <Head>
        <meta name="theme-color" content="#3FCCBB" />
      </Head>
    </>
  )
}

export default Seo
