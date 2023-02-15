import InformationCircleIcon from '@heroicons/react/20/solid/InformationCircleIcon'

import Markdown from 'src/components/Markdown/Markdown'

export default function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-md bg-white/10 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="text-blue-400 h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div className="text-blue-700 text-sm">
            <Markdown>{text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}
