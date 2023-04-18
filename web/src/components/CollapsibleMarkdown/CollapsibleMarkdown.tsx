import { Disclosure } from '@headlessui/react'
import ChevronUpIcon from '@heroicons/react/20/solid/ChevronUpIcon'
import clsx from 'clsx'

import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'

interface CollapsibleMarkdownProps {
  title: string
  defaultOpen?: boolean
  content: string
  marginTop?: boolean
}

const CollapsibleMarkdown = ({
  title,
  defaultOpen = false,
  content,
  marginTop,
}: CollapsibleMarkdownProps) => {
  return (
    <div
      className={clsx('flex-1 overflow-hidden rounded bg-white/5', {
        'mt-4': marginTop,
      })}
    >
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="relative flex w-full items-center justify-center p-2 transition hover:bg-brand-accent-primary/50">
              <Heading visual="s" as="h2">
                {title}
              </Heading>

              <ChevronUpIcon
                className={clsx('absolute right-2 h-8 w-8 transition', {
                  'rotate-180 transform': open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="border-t border-t-white/10 px-2">
              <div className="markdown landing-md px-4 pb-4 text-left text-white/80">
                <Markdown>{content}</Markdown>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default CollapsibleMarkdown
