import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import Discord from "@components/svg/discord-svg";
import TwitterIcon from "@components/svg/twitter-icon-svg";

interface Props {
  navigation: { name: string; href: string }[];
}

export default function Header({ navigation }: Props) {
  return (
    <Disclosure as="nav" className="w-full static z-50 bg-blue">
      {({ open }) => (
        <>
          <div
            className="sm:px-6 lg:px-8 border-b border-indigo-500 lg:border-none"
            aria-label="Top"
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="logo flex-shrink-0 flex items-center">
                <div className="block lg:hidden h-12 w-auto">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={55}
                    alt="IK logo"
                  />
                </div>
                <div className="hidden lg:block h-12 w-auto">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={55}
                    alt="IK logo"
                  />
                </div>
              </div>
              <div className="menu-items flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a className="text-2xl font-medium hover:text-turquoise">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="social flex items-center space-x-6 icons">
                <div className="twitterIcon">
                  <TwitterIcon />
                </div>
                <div className="discordIcon">
                  <Discord />
                </div>
              </div>

              <div className="play inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a
                  href="#"
                  className="inline-block bg-blue hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-2xl font-medium text-white hover:text-blue"
                >
                  Play
                </a>
              </div>

              {/* hamburger icon, visible mobile only */}
              <div className="hamburger flex items-center sm:hidden">
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
                  className="text-white hover:text-turquoise block px-3 py-2 rounded-md text-2xl font-medium"
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
