import ReactMarkdown from "react-markdown";
import Link from "next/link";

import Iframe from "@components/iframe";

import { cleanGqlMarkdown } from "@lib/utils";
import { IK_CLAIMS_NAMESPACE } from "@lib/constants";

type Props = {
  children: string;
};

const Markdown = ({ children }: Props) => (
  <ReactMarkdown
    components={{
      a: ({ href, children }) => {
        if (!href) return null;

        const youtubeEmbed = href.startsWith("https://www.youtube.com/embed");
        const gstopEmbed = href.startsWith(
          "https://www.gstop-content.com/ipfs/"
        );
        const internalLink = href.startsWith(IK_CLAIMS_NAMESPACE);
        const crosswordEmbed = href.startsWith(
          "https://puzzel.org/en/wordseeker/embed"
        );

        if (youtubeEmbed || gstopEmbed || crosswordEmbed) {
          return (
            <Iframe
              src={href}
              title={
                children.length > 0 ? children[0]?.toString() : "embed video"
              }
              aspect={gstopEmbed || crosswordEmbed ? "square" : "video"}
              sandbox={gstopEmbed ? "allow-scripts" : undefined}
            />
          );
        }

        if (internalLink) {
          const path = href.split(IK_CLAIMS_NAMESPACE)[1] || "/";
          return (
            <Link href={path}>
              <a className="underline">{children}</a>
            </Link>
          );
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
        );
      },
    }}
  >
    {cleanGqlMarkdown(children)}
  </ReactMarkdown>
);
export default Markdown;
