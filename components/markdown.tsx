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

        const gstopEmbed = href.startsWith(
          "https://www.gstop-content.com/ipfs/"
        );
        const internalLink = href.startsWith(IK_CLAIMS_NAMESPACE);

        const isEmbed =
          typeof children[0] === "string" && children[0]?.includes("|");

        if (isEmbed) {
          const options =
            typeof children[0] === "string" ? children[0]?.split("|") : [];
          const title = options.length > 0 ? options[0].trim() : "embed video";
          const aspectRatio = options[1].trim();
          return (
            <Iframe
              src={href}
              title={title}
              aspect={aspectRatio}
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
