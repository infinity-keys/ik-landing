import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon";

import Markdown from "@components/markdown";

export default function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-md bg-blue p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div className="text-sm text-blue-700">
            <Markdown>{text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
