import ReactMarkdown from "react-markdown";

import { cleanGqlMarkdown } from "@lib/utils";

type Props = {
  children: string;
};

const Markdown = ({ children }: Props) => (
  <ReactMarkdown>{cleanGqlMarkdown(children)}</ReactMarkdown>
);
export default Markdown;
