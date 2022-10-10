import { Disclosure } from "@headlessui/react";
import clsx from "clsx";

import ChevronUpIcon from "@heroicons/react/20/solid/ChevronUpIcon";

import Markdown from "@components/markdown";
import Heading from "@components/heading";

interface PuzzleLandingInfoProps {
  title: string;
  defaultOpen?: boolean;
  content: string;
  marginTop?: boolean;
}

const PuzzleLandingInfo = ({
  title,
  defaultOpen = false,
  content,
  marginTop,
}: PuzzleLandingInfoProps) => {
  return (
    <div
      className={clsx("flex-1 bg-white/5 rounded overflow-hidden", {
        "mt-4": marginTop,
      })}
    >
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="p-2 w-full transition relative hover:bg-turquoise/50 flex items-center justify-center">
              <Heading visual="s" as="h2">
                {title}
              </Heading>

              <ChevronUpIcon
                className={clsx("transition h-8 w-8 absolute right-2", {
                  "rotate-180 transform": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="border-t border-t-white/10 px-2">
              <div className="markdown text-left px-4 pb-4 text-white/80">
                <Markdown>{content}</Markdown>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PuzzleLandingInfo;
