import ReactMarkdown from "react-markdown";
import Iframe from "@components/iframe";

import { cleanGqlMarkdown } from "@lib/utils";

type Props = {
  children: string;
};

const Markdown = ({ children }: Props) => (
  <ReactMarkdown
    components={{
      a: (props) => {
        // Convert video cpt to iframe cpt
        // if/then to check for youtube or gamestop
        if (
          props.href?.startsWith("https://www.youtube.com/embed") ||
          props.href?.startsWith("https://www.gstop-content.com/ipfs")
        ) {
          return (
            <Iframe
              src={props.href}
              title={
                props.children.length > 0
                  ? props.children[0]?.toString()
                  : "embed video"
              }
            />
          );
        }
        return (
          <a className="underline" href={props.href}>
            {props.children}
          </a>
        );
      },
    }}
  >
    {cleanGqlMarkdown(children)}
  </ReactMarkdown>
);
export default Markdown;
