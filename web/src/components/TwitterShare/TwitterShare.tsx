import TwitterIcon from 'src/svgs/TwitterIcon'

interface TwitterShareProps {
  tweetBody: string
  text?: string
  icon?: boolean
}

const TwitterShare = ({ tweetBody, text, icon = true }: TwitterShareProps) => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetBody
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="social-share inline-flex items-center rounded bg-twitterBlue px-4 py-2 text-sm font-medium transition hover:bg-twitterBlue/70"
    >
      {text || 'Share'}
      {icon && (
        <span className="ml-2">
          <TwitterIcon width={18} height={18} />
        </span>
      )}
    </a>
  )
}

export default TwitterShare
