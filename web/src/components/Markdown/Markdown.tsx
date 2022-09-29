import ReactMarkdown from 'react-markdown'

import { Link } from '@redwoodjs/router'

import Iframe from 'src/components/Iframe/Iframe'

// @TODO: better way to do these paths?
import { IK_CLAIMS_NAMESPACE } from '../../../../lib/constants'
import { cleanGqlMarkdown } from '../../../../lib/utils'

type Props = {
  children: string
}

const Markdown = ({ children }: Props) => (
  <ReactMarkdown
    components={{
      a: ({ href, children }) => {
        if (!href) return null

        const gstopEmbed = href.startsWith(
          'https://www.gstop-content.com/ipfs/'
        )
        const internalLink = href.startsWith(IK_CLAIMS_NAMESPACE)

        const [words] = children

        const isEmbed = typeof words === 'string' && words?.includes('|')

        if (isEmbed) {
          const options = words?.split('|')
          const title = options.length > 0 ? options[0].trim() : 'embed video'
          const aspectRatio = options[1].trim()
          if (!aspectRatio)
            throw new Error(
              'Aspect ratio required. Please input on right side of |.'
            )
          return (
            <Iframe
              src={href}
              title={title}
              aspect={aspectRatio}
              sandbox={gstopEmbed ? 'allow-scripts' : undefined}
            />
          )
        }

        if (internalLink) {
          const path = href.split(IK_CLAIMS_NAMESPACE)[1] || '/'
          return (
            <Link to={path} className="underline">
              {children}
            </Link>
          )
        }

        return (
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            {children}
          </a>
        )
      },
    }}
  >
    {cleanGqlMarkdown(children)}
  </ReactMarkdown>
)
export default Markdown
