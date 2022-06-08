import ReactMarkdown from 'react-markdown'

type Props = {
  children: string;
}

const Markdown = ({ children }: Props) => (
  <ReactMarkdown>
    {/* Graphql returns new lines double escaped and weird. */}
    {children.split(/\\n/).join('\n')}
  </ReactMarkdown>
)


export default Markdown;
