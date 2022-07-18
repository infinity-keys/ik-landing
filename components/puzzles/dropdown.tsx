import { Fragment, forwardRef } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon } from "@heroicons/react/solid";

import { PAGINATION_COUNTS } from "@lib/constants";

interface PuzzlesDropdownProps {
  currentCount: number;
}

const DropdownLink = forwardRef<HTMLAnchorElement, any>((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

DropdownLink.displayName = "DropdownLink";

const PuzzlesDropdown = ({ currentCount }: PuzzlesDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left ml-5">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-turquoise">
          {currentCount}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute w-full right-0 mt-2 text-right rounded-md shadow-lg bg-blue border border-white/20 ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none">
          <div className="">
            {PAGINATION_COUNTS.map((count) => {
              const selectedCount = currentCount === count;
              return (
                <Menu.Item key={count} disabled={selectedCount}>
                  {({ active }) => (
                    <DropdownLink
                      href={count === 8 ? "/puzzles" : `/puzzles/${count}/1`}
                      style={{
                        pointerEvents: selectedCount ? "none" : "auto",
                      }}
                      className={clsx(
                        {
                          "bg-turquoise font-medium": selectedCount,
                          "bg-indigo-500": active,
                        },
                        "block px-4 py-4 text-sm md:py-2 hover:bg-indigo-500"
                      )}
                    >
                      {count}
                    </DropdownLink>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PuzzlesDropdown;
