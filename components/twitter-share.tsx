import TwitterIcon from "@components/svg/twitter-icon-svg";

interface TwitterShareProps {
  tweetBody: string;
  text?: string;
  icon?: boolean;
}

const TwitterShare = ({ tweetBody, text, icon = true }: TwitterShareProps) => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetBody
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="twitter-share text-sm inline-flex items-center bg-twitterBlue px-3 py-1 rounded font-medium transition hover:bg-turquoise"
    >
      {text || "Share"}
      {icon && (
        <span className="ml-2">
          <TwitterIcon width={18} height={18} />
        </span>
      )}
    </a>
  );
};

export default TwitterShare;
