import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import Button from "./button";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Hunts",
    href: "/puzzles",
  },
  { name: "Collab", href: "#collab" },
  {
    name: "Thesis",
    href: "https://blog.infinitykeys.io/what-is-infinity-keys",
  },
  { name: "Blog", href: "https://blog.infinitykeys.io" },
];

export default function Header() {
  return (
    <Disclosure as="nav" className="w-full sticky top-0 z-50 bg-blue">
      {({ open }) => (
        <>
          <div
            className="sm:px-6 lg:px-8 border-b border-indigo-500 lg:border-none"
            aria-label="Top"
          >
            <div className="relative flex items-center justify-between h-20">
              <div className="logo flex-shrink-0 flex items-center">
                <div className="block lg:hidden h-12 w-auto">
                  <Link href="/">
                    <a data-cy="ik logo">
                      <Image
                        src="/logo.svg"
                        width={100}
                        height={55}
                        alt="IK logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden lg:block h-12 w-auto">
                  <Link href={"/"}>
                    <a>
                      <Image
                        src="/logo.svg"
                        width={100}
                        height={55}
                        alt="IK logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="menu-items flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a className="header-nav--link text-2xl font-medium hover:text-turquoise">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div data-cy="puzzle-link">
                <Button text="Puzzles" href="/puzzles" />
              </div>

              {/* hamburger icon, visible mobile only */}
              <div className="hamburger flex items-center pr-4 sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-white block px-3 py-2 rounded-md text-2xl font-medium"
                  aria-current={item.name ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
